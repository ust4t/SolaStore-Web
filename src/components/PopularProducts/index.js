import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ProductCard";
import PopularCard from "../Cards/PopularCard";
import { getPopulars } from "../../redux/action/populars";
import { useQuery } from "react-query";

function PopularProducts({ popular, getPopulars }) {
  const { isLoading, error, data, isFetching } = useQuery(
    "popularProducts",
    () => fetch("/api/getPopulars").then((res) => res.json())
  );

  // useEffect(() => {
  //   getPopulars();
  // }, []);

  // const products = [
  //   {
  //     name: "Product 1",
  //     price: "100",
  //     discount: "20",
  //     images: {
  //       red: ["/img/product/36848736-e.jpg", "/img/product/dress-red-2.jpg"],
  //       black: ["/img/product/8a93a1fc-a1.jpg", "/img/product/ee94f85e-8.jpg"],
  //     },
  //   },
  //   {
  //     name: "Product 2",
  //     price: "150",
  //     discount: "10",
  //     images: {
  //       black: ["/img/product/8a93a1fc-a1.jpg", "/img/product/ee94f85e-8.jpg"],
  //       red: ["/img/product/36848736-e.jpg", "/img/product/dress-red-2.jpg"],
  //     },
  //   },
  //   {
  //     name: "Product 3",
  //     price: "120",
  //     discount: "25",
  //     images: {
  //       red: ["/img/product/36848736-e.jpg", "/img/product/dress-red-2.jpg"],
  //       black: ["/img/product/8a93a1fc-a1.jpg", "/img/product/ee94f85e-8.jpg"],
  //     },
  //   },
  //   {
  //     name: "Product 4",
  //     price: "170",
  //     discount: "15",
  //     images: {
  //       black: ["/img/product/8a93a1fc-a1.jpg", "/img/product/ee94f85e-8.jpg"],
  //       red: ["/img/product/36848736-e.jpg", "/img/product/dress-red-2.jpg"],
  //     },
  //   },
  // ];

  return (
    <Row className="popular-products">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data.map(({ id, name, images, price, discount, variants }, i) => (
          <PopularCard
            key={id}
            id={id}
            price={price}
            name={name}
            discount={discount}
            images={images}
            variants={variants}
          />
        ))
      )}
    </Row>
  );
}

const mapStateToProps = (state) => ({
  popular: state.populars,
});

export default connect(mapStateToProps, {
  getPopulars,
})(PopularProducts);

// export default PopularProducts;
