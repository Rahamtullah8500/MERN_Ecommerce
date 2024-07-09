import { useEffect, useState } from "react";
import "./App.css";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "./redux/slices/ThemeSlice";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [count, setCount] = useState(0);
  const { mode } = useSelector((state) => state.theme);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const handleToggleTheme = () => {
    dispatch(switchMode());
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
            <a href="/signin" className="nav-link">
              SignIn
            </a>
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
