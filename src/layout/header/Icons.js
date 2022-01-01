import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, Dropdown, Row, Col } from "antd";
import ColorfulText from "../../components/ColorfulText";
import CartProductItem from "../../components/CartProductItem";

export const SearchIcon = ({ hendelChangeSearch }) => (
  <Link href="#">
    <a
      className="search-btn nav-search search-trigger"
      onClick={() => hendelChangeSearch()}
    >
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
  const wishlist = useSelector((state) => state.utilis.wishlist);
  return (
    <Link href="/wishlist">
      <a className="position-relative">
        <span className="iconValue">{wishlist && wishlist.length}</span>
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
  const carts = useSelector((state) => state.utilis.carts);
  console.log(carts);
  const cartsNum = carts.reduce((quantity, currQty) => {
    return quantity + currQty.quantity;
  }, 0);

  const totalPrice = carts.reduce((price, currPrice) => {
    return price + currPrice.price;
  }, 0);

  const menu = (
    <Menu style={{ padding: 15, maxHeight: "400px", overflowY: "scroll" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <ColorfulText>${totalPrice}</ColorfulText>
      </div>
      {carts &&
        carts.map(
          ({
            chartID,
            pictureOneGuidName,
            price,
            productShortName,
            quantity,
          }) => (
            <CartProductItem
              key={chartID}
              image={`https://solastore.com.tr/img/ProductWM/minPic/${pictureOneGuidName}`}
              name={productShortName}
              price={price}
              quantity={quantity}
            />
          )
        )}
    </Menu>
  );
  return (
    <Link href="/cart">
      {carts && (
        <Dropdown overlay={menu} placement="topRight">
          <a className="position-relative">
            <span className="iconValue">{cartsNum}</span>
            <i className="fas fa-cart-arrow-down favf" />
          </a>
        </Dropdown>
      )}
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
        }}
      >
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
        }}
      >
        <span className="bar1" />
        <span className="bar2" />
        <span className="bar3" />
      </a>
    </Link>
  </div>
);
