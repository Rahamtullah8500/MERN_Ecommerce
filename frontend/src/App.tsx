import { useState } from "react";

import "./App.css";
import { ProductList } from "./data";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";

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
          <Row>
            {ProductList.map((eachItem, i) => {
              return (
                <Col className=" bg-info" key={i} sm={2} md={4} lg={3} >
                  <img
                    src={eachItem.image}
                    className="product-image"
                    alt="product"
                  />
                  <h2>{eachItem.name}</h2>
                  <p>${eachItem.price}</p>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
      <footer>
        <div className=" text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;
