import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Rating from "../../components/rating/Rating";
import { useEffect, useState } from "react";
import { convertProductToCartItem } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { CartItem } from "../../types/CartType";
import { toast } from "react-toastify";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const params = useParams();
  const { slug } = params;
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const cartItems = cartData.cart.cartItems
  const navigate = useNavigate()


  useEffect(() => {
    handleFetchSelectedProduct(slug);
  }, []);

  const handleFetchSelectedProduct = async (slug: string) => {
    try {
      const response = await axios.get(`api/products/${slug}`);
      setProduct(response.data);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addToCartHandler = (item:CartItem) => {
    const existItem = cartItems.find((x) => x._id === item._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (item.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart({...item,quantity}));
    toast.success('Product added to the cart')
    // navigate('/cart')
  };

  console.log('cart items',cartItems)

  return product !== null ? (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button
                        onClick={() =>
                          addToCartHandler(convertProductToCartItem(product))
                        }
                      >
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  ) : null;
}
//  isLoading ? (
//   <LoadingBox />
// ) : error ? (
//   <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
// ) : !product ? (
//   <MessageBox variant="danger">Product Not Found</MessageBox>
// ) : (
