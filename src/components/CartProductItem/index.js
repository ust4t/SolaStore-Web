import React, { memo, useContext } from "react";
import Image from "next/image";
import { StoreContext } from "../../context/StoreProvider";

function CartProductItem({ id, image, name, price, quantity }) {
  const { cartActions, isCartLoading } = useContext(StoreContext);
  const { removeFromCart } = cartActions;

  const rate = 0.2;

  const handleDelete = () =>
    removeFromCart({
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
      id,
    });

  if (image && name && price)
    return (
      <div className="cart-product-item">
        <div className="cart-product-item-image">
          <Image src={image} width={400 * rate} height={600 * rate} />
        </div>
        <div className="cart-product-item-info">
          <span className="cart-product-item-name">{name}</span>
          <div className="cart-product-item-name">${price}</div>
          <div className="cart-product-item-name">Adet: {quantity}</div>
        </div>
        {isCartLoading ? (
          "Loading..."
        ) : (
          <div onClick={handleDelete} className="trash-container">
            <i className="fas fa-trash-alt" />
          </div>
        )}
      </div>
    );
}

export default memo(CartProductItem);
