import { useContext } from "react";
import Link from "next/link";
import { connect, useSelector } from "react-redux";
import { Menu, Dropdown } from "antd";
import ColorfulText from "../../components/ColorfulText";
import CartProductItem from "../../components/CartProductItem";
import { removeCart } from "../../redux/action/utilis";
import { StoreContext } from "../../context/StoreProvider";
import sources from "../../../sources";

export const SearchIcon = ({ hendelChangeSearch }) => (
  <Link href="#">
    <a
      className="search-btn nav-search search-trigger"
      onClick={() => hendelChangeSearch()}>
      <i className="fas fa-search" />
    </a>
  </Link>
);

export const UserIcon = () => (
  <Link href="/login">
    <a>
      <i className="fas fa-user favf" />
    </a>
  </Link>
);
export const WishlistIcon = () => {
  const { state } = useContext(StoreContext);
  return (
    <Link href="/wishlist">
      <a className="position-relative">
        <span className="iconValue">
          {state.wishlistData ? state.wishlistData.length : 0}
        </span>
        <i className="fas fa-heart favf" />
      </a>
    </Link>
  );
};
export const CompareIcon = () => {
  const compare = useSelector((state) => state.utilis.compares);

  return (
    <Link href="/compare">
      <a className="position-relative">
        <span className="iconValue">{compare && compare.length}</span>
        <i className="fas fa-exchange-alt favf" />
      </a>
    </Link>
  );
};

export const CartIcon = () => {
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

  const menu = (
    <Menu style={{ padding: 15, maxHeight: "400px", overflowY: "scroll" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <ColorfulText>${totalPrice || 0}</ColorfulText>
      </div>
      {state.cartData &&
        state.cartData.map(
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
    </Menu>
  );
  return (
    <Link href="/cart">
      <Dropdown overlay={menu} placement="topRight">
        <a className="position-relative">
          <span className="iconValue">{cartsNum || 0}</span>
          <i className="fas fa-cart-arrow-down favf" />
        </a>
      </Dropdown>
    </Link>
  );
};

export const Logo = () => (
  <div className="logo product-details-logo">
    <Link href="/">
      <a>
        <img src="/img/logo/logo.png" alt="Logo" />
      </a>
    </Link>
  </div>
);
export const HamburgerIcon = ({ sidebarActive, darkBg }) => (
  <div className={`hamburger-menu text-end `}>
    <Link href="#">
      <a
        className={darkBg ? "text-white" : ""}
        onClick={(e) => {
          sidebarActive();
          e.preventDefault();
        }}>
        <i className="fal fa-bars favf" />
      </a>
    </Link>
  </div>
);
export const HomeHamburgerIcon = ({ sidebarActive }) => (
  <div className="basic-bar hamburger-menu">
    <Link href="#">
      <a
        onClick={(e) => {
          e.preventDefault();
          sidebarActive();
        }}>
        <span className="bar1" />
        <span className="bar2" />
        <span className="bar3" />
      </a>
    </Link>
  </div>
);
