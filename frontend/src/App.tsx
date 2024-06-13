import { useState } from "react";

import "./App.css";

import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className=" d-flex flex-column h-full ">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>MERN amazon</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/cart">Cart</a>
            <a href="/signin">SignIn</a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className=" mt-3">
         
          <Outlet/>
        </Container>
      </main>
      <footer>
        <div className=" text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
