import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
  wishlistBox,
  wishlistImage,
  wishlistButton,
  wishlistTitle,
  wishlistPrice,
  wishlistRemove,
  closeIcon,
} from "./WishlistMiniCard.module.css";
import sources from "../../../../sources";
import { encodeURLString } from "../../../utils/utils";

export default function WishlistMiniCard({
  wishlistData,
  addToCart,
  removeFromWishlist,
}) {
  const {
    masterProductID,
    productID,
    productShortName,
    picture_1,
    singlePrice,
  } = wishlistData;
  return (
    <div className="col-12 col-md-6 my-2">
      <div className={wishlistBox}>
        <Link
          href={{
            pathname: `/detail/${encodeURLString(
              productShortName
            )}:${masterProductID}`,
            query: {
              selected: productID,
            },
          }}>
          <Image
            className={`${wishlistImage} cursor-pointer`}
            src={`${sources.imageMinSrc}${picture_1}`}
            alt={productShortName}
            width={60}
            height={90}
            quality={60}
          />
        </Link>
        <Link
          href={{
            pathname: `/detail/${encodeURLString(
              productShortName
            )}:${masterProductID}`,
            query: {
              selected: productID,
            },
          }}>
          <div className="d-flex flex-column justify-content-start mx-2 me-auto align-self-start cursor-pointer">
            <h5 className={wishlistTitle}>{productShortName}</h5>
            <h4 className={wishlistPrice}>${singlePrice}</h4>
          </div>
        </Link>
        <button className={wishlistButton} onClick={addToCart}>
          Sepete Ekle
        </button>
        <button className={wishlistRemove} onClick={removeFromWishlist}>
          <i className={`fas fa-times ${closeIcon}`}></i>
        </button>
      </div>
    </div>
  );
}
