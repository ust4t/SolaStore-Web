import React, { memo, useContext } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import { StoreContext } from "../../context/StoreProvider";
import {
  cart_product_item,
  cart_product_item_image,
  cart_product_item_name,
  trash_container,
  cart_product_item_info,
  trash_icon,
} from "./CartProductItem.module.css";

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
      <div className={cart_product_item}>
        <div className={cart_product_item_image}>
          <Image src={image} width={400 * rate} height={600 * rate} />
        </div>
        <div className={cart_product_item_info}>
          <span className={cart_product_item_name}>{name}</span>
          <div className={cart_product_item_name}>${price}</div>
          <div className={cart_product_item_name}>Adet: {quantity}</div>
        </div>
        {isCartLoading ? (
          "Loading..."
        ) : (
          <div onClick={handleDelete} className={trash_container}>
            <i className={`fas fa-trash-alt ${trash_icon}`} />
          </div>
        )}
      </div>
    );
}

export default memo(CartProductItem);
