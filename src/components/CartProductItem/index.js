import React, { memo, useContext } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

import { StoreContext } from "../../context/StoreProvider";
import { dropdown_img, dropdown_link } from "./CartProductItem.module.css";

function CartProductItem({ id, image, name, price, quantity }) {
  const auth = useSelector((state) => state.auth);
  const { cartActions } = useContext(StoreContext);
  const { removeFromCart } = cartActions;

  const handleDelete = () =>
    removeFromCart({
      user: auth.uid,
      id,
    });

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-7 d-flex align-items-center p-2">
        <Link
          href={{
            pathname: `/detail/${name.toLowerCase().replace(" ", "-")}:${id}`,
            query: {
              selected: id,
            },
          }}>
          <img src={image} className={`${dropdown_img} cursor-pointer`} />
        </Link>
        <Link
          href={{
            pathname: `/detail/${name.toLowerCase().replace(" ", "-")}:${id}`,
            query: {
              selected: id,
            },
          }}>
          <p
            className={`fs-6 cursor-pointer ${dropdown_link}`}
            style={{
              fontWeight: "500",
            }}>
            {name}
          </p>
        </Link>
      </div>
      <div className="col-2">
        <p
          className="fs-6"
          style={{
            fontWeight: "500",
          }}>
          x{quantity}
        </p>
      </div>
      <div className="col-3 d-flex align-items-center">
        <p
          className="fs-6  me-3"
          style={{
            fontWeight: "500",
          }}>
          ${price}
        </p>
        <i
          onClick={handleDelete}
          className="fas fa-times fa-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

export default memo(CartProductItem);
