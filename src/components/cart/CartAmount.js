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
  // refetch,
  // setaddCart,
  // addToCart,
  // decreaseCart,
  productID,
  decrementQuantity,
  incrementQuantity,
  isCartLoading,
}) {
  // const queryClient = useQueryClient();

  // const { mutate, isLoading } = useMutation("amount", handleAmount, {
  //   onSuccess: () => {
  //     refetch();
  //   },
  //   onError: (error) => {
  //     console.log(error.message);
  //     alert(`there was an error`);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("amount");
  //   },
  // });

  const onClickCart = (e, cart) => {
    e.preventDefault();
    const cartData = {
      type: "increaseProductCount",
      id: productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };

    incrementQuantity(cartData);

    // setaddCart(true);
    // toast.success("Add item in Cart.");
    // mutate(cartData);
  };
  const onClickRemoveCart = (e, cart) => {
    e.preventDefault();
    const cartData = {
      type: "decreaseProductCount",
      id: productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };
    decrementQuantity(cartData);
    // decreaseCart(cart);
    // setaddCart(true);
    // toast.error("Remove item from Cart.");
    // mutate(cartData);
  };

  return (
    <div className="cart-plus-minus">
      {isCartLoading ? (
        "Loading..."
      ) : (
        <>
          <input type="text" value={cart.quantity} disabled />
          <div
            className="dec qtybutton"
            onClick={(e) => cart.quantity !== 1 && onClickRemoveCart(e, cart)}>
            -
          </div>
          <div className="inc qtybutton" onClick={(e) => onClickCart(e, cart)}>
            +
          </div>
        </>
      )}
    </div>
  );
}
