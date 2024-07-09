import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchProducts } from "../../redux/slices/FetchProducts";
import ProductItem from "../../components/productItem/ProductItem";
import { Helmet } from "react-helmet-async";

export const HomePage = () => {
  const disptach = useDispatch();


  useEffect(() => {
    disptach(handleFetchProducts());
  }, []);

  const productsData = useSelector(state=>state.productsData)

  const products = productsData!.products



  return (
    <Row>
      {products !== null && products!.map((eachItem) => {
        return (
          <Col key={eachItem.slug} sm={6} md={4} lg={3} className="mb-3">
            <Helmet>
              <title>TS MERN Project</title>
            </Helmet>
            <ProductItem product={eachItem}></ProductItem>
          </Col>
        );
      })}
    </Row>
  );
};
