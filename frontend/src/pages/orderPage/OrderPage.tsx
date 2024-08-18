/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { ApiError } from "../../types/ApiError";
import { getError } from "../../utils";
import MessageBox from "./../../components/messageBox/MessageBox";
import apiClient from "../../apiClient";
import { Order } from "../../types/Order";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

export default function OrderPage() {
  const params = useParams();
  const { id: orderId } = params;

  const [order, setOrder] = useState<Order>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [paypalConfig, setPaypalConfig] = useState<{ clientId: string } | null>( null);
  const [loadingPay, setLoadingPay] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
    getPaypalClientId();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await apiClient.get(`api/orders/${orderId}`);
      setOrder(response.data);
    } catch (err) {
      setError(err as SetStateAction<null>);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get PayPal client ID
  const getPaypalClientId = async () => {
    try {
      const response = await apiClient.get<{ clientId: string }>(
        `/api/keys/paypal`
      );
      // setPaypalConfig(response.data);
      // Load PayPal script
      if (response.data.clientId) {
        // paypalDispatch({
        //   type: "resetOptions",
        //   value: {
        //     "client-id": response.data.clientId,
        //     currency: "USD",
        //   },
        // });
        // paypalDispatch({
        //   type: "setLoadingStatus",
        //   value: SCRIPT_LOADING_STATE.PENDING,
        // });
      }
    } catch (error) {
      toast.error("Error fetching PayPal client ID");
    }
  };

  // Function to pay for an order
  const payOrder = async (details: { orderId: string | undefined }) => {
    setLoadingPay(true);
    try {
      const response = await apiClient.put<{ message: string; order: Order }>(
        `api/orders/${details.orderId}/pay`,
        details
      );
      console.log('payorder res',response)
      toast.success("Order is paid successfully");
      setIsPending(false)
      await fetchOrderDetails(); // Refetch order details after payment
    } catch (err) {
      toast.error("Error paying for the order");
      setIsRejected(true)
    } finally {
      setLoadingPay(false);
    }
  };

  const paypalbuttonTransactionProps = {
    style: { layout: "vertical" as "horizontal" | "vertical" }, 
    createOrder(data: any, actions: any) {
      console.log('create order data',data)
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: order?.totalPrice.toString() || "0",
            },
          },
        ],
      });
    },
    onApprove(data: any, actions: any) {
      console.log('on approve',data)
      return actions.order.capture().then(async () => {
        await payOrder({ orderId });
      });
    },
    onError: (err:object) => {
      toast.error("Error in PayPal transaction",err);
    },
  };

  console.log('order',order)

  return isLoading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !order ? (
    <MessageBox variant="danger">Order Not Found</MessageBox>
  ) : (
    <div>
      <Helmet>
        <title>Order {orderId}</title>
      </Helmet>
      <h1 className="my-3">Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                <strong>Address: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                ,{order.shippingAddress.country}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Delivered at {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Delivered</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Payment</Card.Title>
              <Card.Text>
                <strong>Method:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Paid at {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="warning">Not Paid</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded thumbnail"
                        ></img>{" "}
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Order Summary</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong> Order Total</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {!order?.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : isRejected ? (
                      <MessageBox variant="danger">
                        Error in connecting to PayPal
                      </MessageBox>
                    ) : (
                      <div>
                        <PayPalButtons {...paypalbuttonTransactionProps} ></PayPalButtons>
                        <Button onClick={() => payOrder({ orderId })}>
                          Test Pay
                        </Button>
                      </div>
                    )}
                    {loadingPay && <LoadingBox />}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
