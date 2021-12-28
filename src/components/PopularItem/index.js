import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Row } from "antd";
import ColorfulText from "../ColorfulText";
import Heart from "../Heart";

import { Swiper, SwiperSlide } from "swiper/react";

import SliderProducts from "../sliders/sliderProducts";

import "swiper/css";

function ProductCard({ price, name, discount, images, variants }) {
  //   const colors = Object.keys(images);
  //   if (colors?.length < 1) return null;
  const [currentImages, setCurrentImages] = useState(images);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const rate = 0.7;

  const [arr, setarr] = useState();

  const changeDressColor = (imagesArray) => {
    setCurrentImages(imagesArray);
  };

  const onMouseEnter = () => {
    setCurrentImageIndex(1);
  };
  const onMouseLeave = () => {
    setCurrentImageIndex(0);
  };

  const handleAddToBasket = () => {
    console.log({
      price,
      name,
      discount,
      picture: currentImages[0].guidName,
    });
  };

  return (
    <div className="product-card">
      <Col
        className="product-image-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Row className="product-header">
          <ColorfulText style={{ height: 22 }}>{`-${discount}%`}</ColorfulText>
          <div
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}>
            <Heart isLiked={isLiked} setIsLiked={setIsLiked} />
          </div>
        </Row>
        <div
          className={`add-to-cart animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
          }`}
          onClick={handleAddToBasket}>
          Sepete Ekle
        </div>
        <div
          className={`product-image-1 animate__animated animate__faster ${
            !currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}>
          {/* default images */}
          <Image
            src={`https://solastore.com.tr/img/ProductWM/maxPic/${currentImages[0].guidName}`}
            width={400 * rate}
            height={600 * rate}
            priority={true}
          />
        </div>
        <div
          className={`product-image-2 animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}>
          {/* hover images */}
          <Image
            src={`https://solastore.com.tr/img/ProductWM/maxPic/${currentImages[1].guidName}`}
            width={400 * rate}
            height={600 * rate}
          />
        </div>
      </Col>
      <Link href={"/shop-details"}>
        <div className="product-card-name">{name}</div>
      </Link>
      <div className="product-card-price">{`$ ${price}`}</div>

      <Row className="select-colors">
        {[...variants, images].map(({ picture_1, pictures }, i) => (
          <Image
            key={`${i}__`}
            className="color-select"
            width={45}
            height={45}
            src={`https://solastore.com.tr/img/ProductWM/maxPic/${
              picture_1 || images[0].guidName
            }`}
            priority={true}
            onClick={() => {
              if (pictures) {
                changeDressColor(pictures);
              } else {
                changeDressColor(images);
              }
            }}
          />
        ))}
      </Row>
    </div>
  );
}

export default ProductCard;
