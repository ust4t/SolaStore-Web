import React from "react";
import Image from "next/image";
import { Col, Row } from "antd";

function CartProductItem({ image, name, price }) {
  const rate = 0.2;
  if (image && name && price)
    return (
      <Row className="cart-product-item">
        <div className="cart-product-item-image">
          <Image src={image} width={400 * rate} height={600 * rate} />
        </div>
        <Col className="cart-product-item-info">
          <span className="cart-product-item-name">{name}</span>
          <div className="cart-product-item-price">${price}</div>
        </Col>
        <div className="trash-container">
          <i className="fas fa-trash-alt" />
        </div>
      </Row>
    );
}

export default CartProductItem;
