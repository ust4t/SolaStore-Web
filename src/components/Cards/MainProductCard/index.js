import React, { useState } from "react";
import Image from "next/image";
import { Col, Row } from "antd";
import Link from "next/link";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import toast from "react-hot-toast";

import Heart from "../../Heart";
import sources from "../../../../sources";
import { addToCart } from "../../../redux/action/utilis";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/product";
import { StoreContext } from "../../../context/StoreProvider";
import ColorfulText from "../../ColorfulText";

const sendCartRequest = async (creds) => {
  const { data } = await axios.post(
    `/api/cart/addToCart?productID=${creds.id}`
  );

  return data;
};

function MainProductCard({ id, price, name, images, oldPrice = 0, addToCart }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const originalDiscount = !!oldPrice && oldPrice - price;

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

  const rate = 0.7;

  const onMouseEnter = () => {
    setCurrentImageIndex(1);
  };
  const onMouseLeave = () => {
    setCurrentImageIndex(0);
  };
  const onAddToCart = () => {
    const cartCurrent = {
      id,
    };
    mutate(cartCurrent);
  };

  return (
    <div
      className="product-card"
      style={{
        margin: "20px",
      }}>
      <Col
        className="product-image-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}>
        <Row className="product-header">
          {!!originalDiscount ? (
            <ColorfulText
              style={{ height: 22 }}>{`↓ $${originalDiscount}`}</ColorfulText>
          ) : (
            <div
              style={{
                background: "#9c27b0",
                padding: "0 10px",
                color: "#fff",
                display: "grid",
                placeContent: "center",
                height: 22,
              }}>
              New
            </div>
          )}
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
          onClick={onAddToCart}>
          {isLoading ? "Loading......" : "Sepete Ekle"}
        </div>

        <div
          className={`product-image-1 animate__animated animate__faster ${
            !currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}>
          <Link href={`/shop/${id}`}>
            <Image
              src={`${sources.imageMidSrc}${images[0].guidName}`}
              width={400 * rate}
              height={600 * rate}
              priority={true}
            />
          </Link>
        </div>
        <div
          className={`product-image-2 animate__animated animate__faster ${
            currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
          }`}>
          <Link href={`/shop/${id}`}>
            <Image
              src={`${sources.imageMidSrc}${images[1].guidName}`}
              width={400 * rate}
              height={600 * rate}
              priority={true}
            />
          </Link>
        </div>
      </Col>
      <Link href={`/shop/${id}`}>
        <div
          className="product-card-name"
          style={{
            fontSize: "1rem",
          }}>
          {name}
        </div>
      </Link>
      <div className="product-card-price">{`$ ${price}`}</div>
    </div>
  );
}

export default connect(null, {
  addToCart,
  getProducts,
})(MainProductCard);
