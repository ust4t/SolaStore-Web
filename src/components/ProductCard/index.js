import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Col, Row } from "antd";
import ColorfulText from "../ColorfulText";
import Heart from "../Heart";

function ProductCard({ price, name, discount, images }) {
  const colors = Object.keys(images);
  if (colors?.length < 1) return null;
  const [currentImages, setCurrentImages] = useState(images[colors[0]]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const rate = 0.7;

  const changeDressColor = (colorIndex) => {
    setCurrentImages(images[colors[colorIndex]]);
  };

  const onMouseEnter = () => {
    setCurrentImageIndex(1);
  };
  const onMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  return (
    <div className="product-card">
      <Col
        className="product-image-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Row className="product-header">
          <ColorfulText style={{ height: 22 }}>{`-${discount}%`}</ColorfulText>
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Heart isLiked={isLiked} setIsLiked={setIsLiked} />
          </div>
        </Row>
        <div
          className={`add-to-cart animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
          }`}
        >
          Sepete Ekle
        </div>
        <div
          className={`product-image-1 animate__animated animate__faster ${
            !currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          <Image
            src={currentImages[0]}
            width={400 * rate}
            height={600 * rate}
          />
        </div>
        <div
          className={`product-image-2 animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          <Image
            src={currentImages[1]}
            width={400 * rate}
            height={600 * rate}
          />
        </div>
      </Col>
      <Link href={"/shop-details"}>
        <div className="product-card-name">{name}</div>
      </Link>
      <div className="product-card-price">{`$${price}`}</div>
      <Row className="select-colors">
        {colors.map((color, i) => (
          <Image
            key={i}
            className="color-select"
            width={45}
            height={45}
            src={images[color][0]}
            onClick={() => changeDressColor(i)}
          />
        ))}
      </Row>
    </div>
  );
}

export default ProductCard;
