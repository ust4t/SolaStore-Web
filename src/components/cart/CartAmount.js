import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import axios from "axios";

const handleAmount = async (creds) => {
  const { data: response } = await axios.post(
    `/api/cart/${creds.type}?user=${creds.user}&ProductID=${creds.id}`
  );

  return response.data;
};

export default function CartAmount({
  cart,
  productID,
  decrementQuantity,
  incrementQuantity,
  isCartLoading,
}) {
  const onClickCart = (e, cart) => {
    e.preventDefault();
    const cartData = {
      type: "increaseProductCount",
      id: productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };

    incrementQuantity(cartData);
  };
  const onClickRemoveCart = (e, cart) => {
    e.preventDefault();
    const cartData = {
      type: "decreaseProductCount",
      id: productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };
    decrementQuantity(cartData);
  };

  return (
    <td className="quantity-col align-middle">
      <div className="left">
        <input
          type="button"
          onClick={(e) => cart.quantity !== 1 && onClickRemoveCart(e, cart)}
          className="minus"
          value="-"
        />
      </div>
      <div className="left">
        <input
          className="form-control bg-white rounded-0"
          type="text"
          value={cart.quantity}
          style={{
            left: "-2px",
            top: 0,
            width: "60px",
            textAlign: "center",
          }}
          disabled
        />
      </div>
      <div className="left">
        <input
          type="button"
          onClick={(e) => onClickCart(e, cart)}
          className="minus"
          value="+"
        />
      </div>
    </td>
  );
}
