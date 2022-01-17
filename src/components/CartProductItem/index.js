import React, { memo, useContext } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { StoreContext } from "../../context/StoreProvider";

function CartProductItem({ id, image, name, price, quantity }) {
  const uid = useSelector((state) => state.auth.uid);
  const { cartActions, isCartLoading } = useContext(StoreContext);
  const { removeFromCart } = cartActions;

  const rate = 0.2;

  const handleDelete = () =>
    removeFromCart({
      user: uid,
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
