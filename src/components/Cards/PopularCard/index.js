import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Row } from "antd";
import ColorfulText from "../../ColorfulText";
import Heart from "../../Heart";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import SliderProducts from "../../sliders/sliderProducts";

import "swiper/css";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addToCart } from "../../../redux/action/utilis";
import { connect } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const sendCartRequest = async (creds) => {
  const { data } = await axios.post(
    `/api/cart/addToCart?productID=${creds.id}`
  );

  return data;
};

function ProductCard({
  id,
  price,
  name,
  discount,
  images,
  variants,
  addToCart,
}) {
  //   const colors = Object.keys(images);
  //   if (colors?.length < 1) return null;
  const router = useRouter();

  const originalDiscount = (price * 100) / discount - price;

  const queryClient = useQueryClient();
  const { refetch } = useQuery(
    "cart",
    () =>
      fetch(
        `/api/cart/getCartItems?user=${"0d1c9955-326f-42fd-b04d-b745b80b70e3"}`
      ).then((res) => res.json()),
    {
      onSuccess: ({ data }) => {
        addToCart(data);
      },
    }
  );
  const { mutate, isLoading } = useMutation(sendCartRequest, {
    onSuccess: (data) => {
      const message = "success";
      refetch();
      toast.success("Added order to cart");
    },
    onError: (error) => {
      console.log(error);
      alert(`there was an error ${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });
  const [currentImages, setCurrentImages] = useState({
    id,
    pictures: images,
  });
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
  const onAddToCart = () => {
    const cartCurrent = {
      id: currentImages.id,
    };
    mutate(cartCurrent);
  };

  const navigateToDetail = () => {
    router.push({
      pathname: `/shop/${currentImages.id}`,
    });
  };

  return (
    <div
      className="product-card"
      style={{
        margin: "20px",
      }}
    >
      <Col
        className="product-image-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Row className="product-header">
          {!!discount && discount > 0 && (
            <ColorfulText
              style={{ height: 22 }}
            >{`- $${originalDiscount}`}</ColorfulText>
          )}
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
          onClick={onAddToCart}
        >
          {isLoading ? "Loading......" : "Sepete Ekle"}
        </div>

        <div
          className={`product-image-1 animate__animated animate__faster ${
            !currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          {/* <Link href={`/shop/${currentImages.id}`}> */}
          {/* default images */}
          <Image
            onClick={navigateToDetail}
            src={`https://solastore.com.tr/img/ProductWM/maxPic/${currentImages.pictures[0].guidName}`}
            width={400 * rate}
            height={600 * rate}
            priority={true}
          />
          {/* </Link> */}
        </div>
        <div
          className={`product-image-2 animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}
        >
          {/* <Link href={`/shop/${currentImages.id}`}> */}
          {/* hover images */}
          <Image
            onClick={navigateToDetail}
            src={`https://solastore.com.tr/img/ProductWM/maxPic/${currentImages.pictures[1].guidName}`}
            width={400 * rate}
            height={600 * rate}
            priority={true}
          />
          {/* </Link> */}
        </div>
      </Col>
      {/* <Link href={`/shop/${currentImages.id}`}> */}
      <div
        onClick={navigateToDetail}
        className="product-card-name"
        style={{
          fontSize: "1rem",
        }}
      >
        {name}
      </div>
      {/* </Link> */}
      <div className="product-card-price">{`$ ${price}`}</div>

      <Row className="select-colors">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {[...variants, { images }].map((variant, i) => (
            <SwiperSlide>
              <Image
                key={`${i}__`}
                className="color-select"
                width={120}
                height={120}
                src={`https://solastore.com.tr/img/ProductWM/maxPic/${
                  variant.picture_1 || variant.images[0].guidName
                }`}
                priority={true}
                onClick={() => {
                  if (variant.pictures) {
                    setCurrentImages({
                      id: variant.productID,
                      pictures: variant.pictures,
                    });
                  } else {
                    setCurrentImages({
                      id,
                      pictures: variant.images,
                    });
                  }
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Row>
    </div>
  );
}

export default connect(null, {
  addToCart,
})(ProductCard);
