import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import {
  addToCart,
  addWishlist,
  compare,
  getWishlist,
  removeCompare,
} from "../../redux/action/utilis";
import time from "../../utils/time";
import ProductModal from "./ProductModal";
import Reating from "./Reating";
import sources from "../../../sources";

const Product = ({
  product,
  wrapperPadding0,
  addToCart,
  addWishlist,
  compare,
  removeCompare,
  home5,
  notHover,
  home3,
}) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);
  const compares = useSelector((state) => state.utilis.compares);

  const [quickView, setQuickView] = useState(false);
  const [addCompare, setAddCompare] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [addWishlist_, setAddWishlist_] = useState(false);

  const onClickCompare = (e) => {
    e.preventDefault();
    setAddCompare(true);
    const exitsItem = compares.find((compare) => compare.id === product.id);
    if (compares.length < 3) {
      if (exitsItem) {
        toast.error("Remove item from compare.");
        compare(product);
      } else {
        toast.success("Add item in Compare.");
        compare(product);
      }
    } else {
      if (exitsItem) {
        toast.error("Remove item from compare.");
        removeCompare(product);
      } else {
        toast.error("Compare is full please remove item from compare list.");
      }
    }
  };

  const onClickCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setaddCart(true);
    toast.success("Add item in Cart.");
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    setAddWishlist_(true);
    const wishlist_ = wishlist.find((wishlist) => wishlist.id === product.id);
    if (wishlist_) {
      toast.error("Remove item in wishlist.");
    } else {
      toast.success("Add item in wishlist.");
    }
  };
  return (
    <div className={home5 ? "fruit-product mb-30" : "product-wrapper mb-40"}>
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      <div
        className={`${home5 ? "fruit-img" : "pro-img"} mb-${home5 ? 10 : 20}`}>
        <Link href={`/shop/${product.masterProductID}`}>
          <a>
            <img
              src={`${sources.imageMidSrc}${product.picture_1}`}
              className="img-fluid"
              alt="Product"
            />
          </a>
        </Link>
        {home5 && (
          <Fragment>
            {/* {product.new && <span className="new-text">sale</span>}
            {product.sale && <span className="sale-text">sale</span>}
            {product.upComeing && (
              <div className="countdown-wrapper-five">
                <div className="product-countdown">
                  <div className="time-count-deal">
                    <div className="countdown-list" data-countdown="2020/12/01">
                      <div className="time-count">
                        {time(product && product.upComeing).days}{" "}
                        <span>days</span>
                      </div>
                      <div className="time-count">
                        {time(product && product.upComeing).hours}{" "}
                        <span>hour</span>
                      </div>
                      <div className="time-count">
                        {time(product && product.upComeing).minutes}{" "}
                        <span>minute</span>
                      </div>
                      <div className="time-count">
                        {time(product && product.upComeing).seconds}{" "}
                        <span>Second</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}
          </Fragment>
        )}
        {!notHover && (
          <div className="product-action text-center">
            <a
              href="#"
              onClick={(e) => onClickCart(e)}
              data-toggle="tooltip"
              data-placement="top"
              title="Shoppingb Cart">
              <i className="fal fa-cart-arrow-down" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setQuickView(true);
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Quick View">
              <i className="fal fa-eye" />
            </a>
            <a
              href="#"
              onClick={(e) => onClickCompare(e)}
              data-toggle="tooltip"
              data-placement="top"
              title="Compare"
              className={
                compares.find((compare) => compare.id === product.id)
                  ? "active"
                  : ""
              }>
              <i className="fal fa-exchange" />
            </a>
          </div>
        )}
      </div>
      {/* {home3 && product.reating && <Reating rating={product.reating} />} */}
      <div className={home5 ? "fruit-text" : "pro-text"}>
        {/* {home5 && product.subName && <span>{product.subName}</span>} */}
        <div className="pro-title">
          <h6>
            <Link href={`/shop/${product.masterProductID}`}>
              {product.productShortName}
            </Link>
          </h6>

          {product.oldPrice > 0 ? (
            <>
              <h5 className="pro-price">
                {product.price &&
                  product.oldPrice &&
                  `${
                    Number(product.oldPrice).toFixed(2) -
                    Number(product.price).toFixed(2)
                  }`}
              </h5>
              <h5 className="pro-price">
                {product.price && (
                  <del>${Number(product.price).toFixed(2)}</del>
                )}
              </h5>
            </>
          ) : (
            <h5 className="pro-price">
              {product.price && `$${Number(product.price).toFixed(2)}`}
            </h5>
          )}
        </div>
        {!home5 && (
          <div className="cart-icon">
            <a
              href="#"
              onClick={(e) => onClickWishlist(e)}
              className={` ${
                wishlist && wishlist.find((pro) => pro.id === product.id)
                  ? "active"
                  : ""
              } `}>
              <i className="fal fa-heart" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(null, {
  addToCart,
  addWishlist,
  getWishlist,
  compare,
  removeCompare,
})(Product);
