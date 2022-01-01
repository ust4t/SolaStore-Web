import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ProductCard";
import PopularCard from "../Cards/PopularCard";
import { getPopulars } from "../../redux/action/populars";
import { useQuery } from "react-query";

function PopularProducts({ popular, getPopulars }) {
  const { isLoading, error, data } = useQuery("popularProducts", () =>
    fetch("/api/getPopulars").then((res) => res.json())
  );

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
