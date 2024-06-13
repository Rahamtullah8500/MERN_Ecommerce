import React from "react";
import { ProductList } from "../../data";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const HomePage = () => {
  return (
    <Row>
      {ProductList.map((eachItem, i) => {
        return (
          <Col className=" bg-info" key={i} sm={2} md={4} lg={3}>
            <Link to={"/product/" + eachItem.slug}>
              <img
                src={eachItem.image}
                className="product-image"
                alt="product"
              />
              <h2>{eachItem.name}</h2>
              <p>${eachItem.price}</p>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};
