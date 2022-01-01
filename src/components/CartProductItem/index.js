import React from "react";
import Image from "next/image";
import { Col, Row } from "antd";
import { QueryClient, useMutation, useQuery } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { addToCart } from "../../redux/action/utilis";
import { connect } from "react-redux";

const sendDeleteRequest = async (creds) => {
  const { data } = await axios.post(
    `/api/cart/removeFromCart?user=${creds.user}&ProductID=${creds.id}`
  );

  return data;
};
function CartProductItem({ id, image, name, price, quantity, addToCart }) {
  const queryClient = new QueryClient();

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

  const { mutate, isLoading } = useMutation("deleteCart", sendDeleteRequest, {
    onSuccess: (data) => {
      refetch();
      toast.error("Deleted order");
    },
    onError: (error) => {
      console.log(error);
      alert(`there was an error ${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries("deleteCart");
    },
  });
  const rate = 0.2;

  const handleDelete = (currentID) => {
    const cartData = {
      id: currentID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };

    mutate(cartData);
  };
  if (image && name && price)
    return (
      <Row className="cart-product-item">
        <div className="cart-product-item-image">
          <Image src={image} width={400 * rate} height={600 * rate} />
        </div>
        <Col className="cart-product-item-info">
          <span className="cart-product-item-name">{name}</span>
          <div className="cart-product-item-name">${price}</div>
          <div className="cart-product-item-name">Adet: {quantity}</div>
        </Col>
        {isLoading ? (
          "Loading..."
        ) : (
          <div onClick={() => handleDelete(id)} className="trash-container">
            <i className="fas fa-trash-alt" />
          </div>
        )}
      </Row>
    );
}

export default connect(null, {
  addToCart,
})(CartProductItem);
