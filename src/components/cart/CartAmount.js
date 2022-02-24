import React from "react";
import { useSelector } from "react-redux";

export default function CartAmount({
  cart,
  productID,
  decrementQuantity,
  incrementQuantity,
}) {
  const user = useSelector((state) => state.auth);
  const onClickCart = (e) => {
    e.preventDefault();
    const cartData = {
      type: "increaseProductCount",
      id: productID,
      user: user.uid,
    };

    incrementQuantity(cartData);
  };
  const onClickRemoveCart = (e) => {
    e.preventDefault();
    const cartData = {
      type: "decreaseProductCount",
      id: productID,
      user: user.uid,
    };
    decrementQuantity(cartData);
  };

  return (
    <div className="quantity-col align-middle my-2">
      <div className="left">
        <input
          type="button"
          onClick={(e) => cart.quantity !== 1 && onClickRemoveCart(e)}
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
          onClick={onClickCart}
          className="minus"
          value="+"
        />
      </div>
    </div>
  );
}
