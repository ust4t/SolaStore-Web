import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import CartProductItem from "../../../components/CartProductItem";
import { StoreContext } from "../../../context/StoreProvider";
import sources from "../../../../sources";
import { cart_dropdown, mainCart, dropdown_btn } from "./Icons.module.css";
import useTranslation from "next-translate/useTranslation";

export const SearchIcon = ({ hendelChangeSearch }) => (
  <Link href="#">
    <a
      className="search-btn nav-search search-trigger"
      onClick={hendelChangeSearch}>
      <i className="fas fa-search" />
    </a>
  </Link>
);

export const UserIcon = () => {
  return (
    <Link href="/login">
      <a className="d-flex align-items-end justify-content-center d-none d-sm-block">
        <i className="fas fa-user fs-4" />
      </a>
    </Link>
  );
};

export const WishlistIcon = () => {
  const { state } = useContext(StoreContext);
  return (
    <Link href="/wishlist">
      <a className="position-relative ml-0">
        <span className="iconValue">
          {state.wishlistData ? state.wishlistData.length : 0}
        </span>
        <i className="fas fa-heart fs-4" />
      </a>
    </Link>
  );
};

export const HomeIcon = () => {
  return (
    <Link href="/">
      <a className="d-block d-lg-none">
        <i className="fas fa-house-user fs-4" />
      </a>
    </Link>
  );
};

export const CartIcon = () => {
  const { t } = useTranslation("cart");
  const { state } = useContext(StoreContext);

  const cartsNum =
    state.cartData &&
    state.cartData.reduce((quantity, currQty) => {
      return quantity + currQty.quantity;
    }, 0);

  const totalPrice =
    state.cartData &&
    state.cartData.reduce((price, currPrice) => {
      return price + currPrice.price;
    }, 0);

  return (
    <div className={`${mainCart}`}>
      <Link href="/cart">
        <a>
          <span className="iconValue">{cartsNum || 0}</span>
          <i className="fas fa-cart-arrow-down fs-3" />
        </a>
      </Link>
      {state.cartData ? (
        <div className={`d-none d-lg-block ${cart_dropdown}`}>
          <div
            style={{
              maxHeight: "400px",
              overflow: "hidden",
              overflowY: "auto",
            }}>
            {state.cartData.map(
              ({
                chartID,
                pictureOneGuidName,
                price,
                productShortName,
                productID,
                quantity,
              }) => (
                <CartProductItem
                  key={chartID}
                  image={`${sources.imageMinSrc}${pictureOneGuidName}`}
                  name={productShortName}
                  price={price}
                  id={productID}
                  quantity={quantity}
                />
              )
            )}
          </div>
          <div className="row pe-3 bg-light py-1">
            <div className="col-12">
              <p
                className="fw-bold text-end mb-1"
                style={{
                  fontSize: ".8rem",
                }}>
                {t("cartAmount")}: <span className="ms-5">${totalPrice}</span>
              </p>
              <p
                className="fw-bold text-end"
                style={{
                  fontSize: ".8rem",
                }}>
                {t("totalAmount")}: <span className="ms-5">${totalPrice}</span>
              </p>
            </div>
          </div>
          <div
            className="row justify-content-center"
            style={{
              background: "#ccc",
            }}>
            <div className="col-5 py-2">
              <Link href="/cart">
                <button className={`btn grenbtn1 ${dropdown_btn}`}>
                  {t("cartTitle")}
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className={`d-none d-lg-block ${cart_dropdown}`}>
          <p className="text-center p-3 fs-6">{t("cartEmpty")}</p>
        </div>
      )}
    </div>
  );
};

export const Logo = () => (
  <div className="logo product-details-logo">
    <Link href="/">
      <a>
        <Image src="/images/logo/logo.png" alt="Logo" width="120" height="80" />
      </a>
    </Link>
  </div>
);
export const HamburgerIcon = ({ sidebarActive, darkBg }) => (
  <div className="hamburger-menu text-end d-block d-lg-none me-2">
    <Link href="#">
      <a
        className={darkBg ? "text-white" : ""}
        onClick={(e) => {
          e.preventDefault();
          sidebarActive();
        }}>
        <i className="fas fa-bars fs-3" />
      </a>
    </Link>
  </div>
);
