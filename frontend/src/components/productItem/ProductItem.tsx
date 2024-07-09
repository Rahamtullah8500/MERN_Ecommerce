import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Product } from "../../types/Product";
import Rating from "../rating/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/CartSlice";
import { convertProductToCartItem } from "../../utils";
import { toast } from "react-toastify";
import { CartItem } from "../../types/CartType";

function ProductItem({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);

  const cartItems = cartData.cart.cartItems

  // const handleFetchSelectedProduct = async (slug: string) => {
  //   try {
  //     let response = await axios.get(`api/products/${slug}`);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  const addToCartHandler = (item:CartItem) => {
    const existItem = cartItems.find((x) => x._id === item._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (item.countInStock < quantity) {
      alert("Sorry. Product is out of stock");
      return;
    }
    dispatch(addToCart({...item,quantity}));
    toast.success('Product added to the cart')
  };

  console.log('caritems 2',cartItems)

  return (
    <Card onClick={() => "handleFetchSelectedProduct(product.slug)"}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductItem;
