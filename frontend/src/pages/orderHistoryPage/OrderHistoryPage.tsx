import { Button } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
// import { useGetOrderHistoryQuery } from '../hooks/orderHooks'
import LoadingBox from './../../components/loadingBox/LoadingBox';
import MessageBox from './../../components/messageBox/MessageBox';
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import apiClient from '../../apiClient';

export default function OrderHistoryPage() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  // Function to fetch order history
  const fetchOrderHistory = async () => {
    setIsLoading(true);
    setError(null); // Reset error state before the request
    try {
      const response = await apiClient.get<Order[]>(`/api/orders/mine`);
      setOrders(response.data);
    } catch (err) {
      setError('Error fetching order history');
      toast.error('Error fetching order history'); // Optional: Show toast notification
    } finally {
      setIsLoading(false);
    }
  };

  console.log('orders',orders)



  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>

      <h1>Order History</h1>
      {isLoading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>{order.totalPrice?.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}