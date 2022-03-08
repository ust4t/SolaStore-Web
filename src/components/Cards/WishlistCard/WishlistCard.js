import React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import { wishlist_center } from "./WishlistCard.module.css";
import { encodeURLString } from "../../../utils/utils";
import sources from "../../../../sources";

export default function WishlistCard({
  wishlist,
  onAddToCart,
  onWishlistRemove,
}) {
  const { t } = useTranslation("common");
  return (
    <div className="row align-items-center justify-content-center border-bottom mx-2 mt-3 mt-lg-2">
      <div className="col-12 d-block d-lg-none">
        <a href="#">
          <i className="fa fa-times fs-4" onClick={onWishlistRemove} />
        </a>
      </div>
      <div className={`col-12 col-lg-3 ${wishlist_center} mb-3 mb-lg-0`}>
        <Link
          href={{
            pathname: `/detail/${encodeURLString(wishlist.productShortName)}:${
              wishlist.productID
            }`,
            query: {
              selected: wishlist.productID,
            },
          }}>
          <a>
            <Image
              src={`${sources.imageMidSrc}${wishlist.picture_1}`}
              alt="wishlist"
              width="210"
              height="300"
            />
          </a>
        </Link>
      </div>
      <div className={`col-12 col-lg-3 ${wishlist_center} mb-3 mb-lg-0`}>
        <Link
          href={{
            pathname: `/detail/${encodeURLString(wishlist.productShortName)}:${
              wishlist.productID
            }`,
            query: {
              selected: wishlist.productID,
            },
          }}>
          <a className="fs-5" href="#">
            {wishlist.productShortName}
          </a>
        </Link>
      </div>
      <div className={`col-12 col-lg-3 fs-5 ${wishlist_center} mb-3 mb-lg-0`}>
        <span>${Number(wishlist.singlePrice).toFixed(0)}</span>
      </div>
      <div
        className={`col-12 col-lg-3 mb-3 mb-lg-0 ${wishlist_center} d-flex align-items-center justify-content-around`}>
        <Link href="#">
          <a className="bt-btn theme-btn-2" onClick={onAddToCart}>
            {t("basket")}
          </a>
        </Link>
        <a className="d-none d-lg-block" href="#" onClick={onWishlistRemove}>
          <i className="fa fa-times fs-5" />
        </a>
      </div>
    </div>
  );
}
