import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ProductCard";
import PopularItem from "../PopularItem"
import { getPopulars } from "../../redux/action/populars";

function PopularProducts({
  popular,
  getPopulars
}) {


  useEffect(()=>{
    getPopulars()
  },[])

  console.log("popular:", popular)
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
      {/* {
        popular.popularProductData && popular.popularProductData.map(
          ({
            id,
            name,
              images,
              price,
              discount,
          }, i) =>
             (
              <ProductCard
                key={id}
                price={price}
                name={name}
                discount={discount}
                images={
                  {
                  }
                }
              />
            ))
      } */}
      {
        popular.popularProductData && popular.popularProductData.map(
          ({
            id,
            name,
              images,
              price,
              discount,
              variants
          }, i) =>
             (
          <PopularItem
          key={id}
          price={price}
          name={name}
          discount={discount}
          images={
            images
          }
          variants={variants}
          />
            ))
      }
    </Row>
  );
}

const mapStateToProps = (durum) => ({
  popular: durum.populars
})

export default connect(mapStateToProps, {
  getPopulars
})(PopularProducts)


// export default PopularProducts;
