import { useEffect, useState } from "react";
import "./App.css";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "./redux/slices/ThemeSlice";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userSignOut } from "./redux/slices/UserInfo";

function App() {
  const [count, setCount] = useState(0);

  const { mode } = useSelector((state) => state.theme);

  const cart = useSelector((state) => state.cart.cart);

  const userInfo = useSelector((state) => state.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const handleToggleTheme = () => {
    dispatch(switchMode());
  };

  const signoutHandler = () => {
    dispatch(userSignOut());
    localStorage.removeItem("userInfo");
    // localStorage.removeItem('cartItems')
    // localStorage.removeItem('shippingAddress')
    // localStorage.removeItem('paymentMethod')
    window.location.href = "/signin";
  };

  return (
    <div className=" d-flex flex-column h-full ">
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>tsamazona</Navbar.Brand>
            </LinkContainer>
          </Container>
          <Nav>
            <Button variant={mode} onClick={handleToggleTheme}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link className="nav-link" to="/signin">
                Sign In
              </Link>
            )}
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className=" mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className=" text-center">All rights reserved</div>
      </footer>
      <ToastContainer position="top-right" limit={1} />
    </div>
  );
}

export default App;
