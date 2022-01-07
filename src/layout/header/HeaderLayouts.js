import Link from "next/link";
import Router from "next/router";
import { Fragment, useState } from "react";
import {
  CartIcon,
  CompareIcon,
  HamburgerIcon,
  HomeHamburgerIcon,
  Logo,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "./Icons";
import Menu from "./Menu";

export const Layout1 = ({
  setSidebar,
  setActiveSearchBar,
  news,
  transparent,
  totalPrice,
  totalCarts,
}) => (
  <header className={transparent ? "header-transparent" : ""}>
    {news}
    <div className="header-menu-area logo-circle-area">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-3 col-lg-3 col-md-3 col-12">
            <div className="header-left-icon d-flex align-items-center justify-content-center justify-content-md-left">
              <HomeHamburgerIcon sidebarActive={() => setSidebar()} />
              <SearchIcon hendelChangeSearch={() => setActiveSearchBar()} />
              <WishlistIcon /> <CompareIcon />
              <UserIcon />
            </div>
          </div>
          <div className="col-xl-6 col-lg-5 col-md-4 col-5">
            <div className="logo pt-45 pb-45 text-left text-lg-center">
              <Link href="/">
                <a>
                  <img src="/img/logo/logo.png" alt="Logo" />
                </a>
              </Link>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-5 col-7">
            <div className="shop-cart ">
              <div className="text-end">
                <Link href="/cart">
                  <a>
                    <h6 className="d-none d-md-inline-block">
                      Shopping Bag <span>{totalCarts}</span>
                    </h6>
                    <h6 className="d-inline-block d-md-none">
                      Cart <span>{totalCarts}</span>
                    </h6>
                    <div className="cart-price">$ {totalPrice}</div>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);
export const Layout2 = ({
  setSidebar,
  setActiveSearchBar,
  darkBg,
  logoLeft,
  news,
}) => (
  <header className={` ${darkBg ? "black-bg" : ""}`}>
    {news}

    <div className="header-menu-area logo-circle-area ">
      <div className="container-fluid">
        <div className="row align-items-center">
          {logoLeft ? (
            <Fragment>
              <div className="col-xl-4 col-lg-4 col-md-4 col-4 ta d-none d-lg-block order-1">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img
                        src={
                          darkBg ? "img/logo/logo3.png" : "img/logo/logo.png"
                        }
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-4 col-12 d-block order-2">
                <div className="input-group">
                  {" "}
                  <input
                    type="text"
                    className="form-control input-text"
                    placeholder="Aramak İstediğiniz Ürünü Yazınız..."
                    aria-label
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    {" "}
                    <button
                      className="btn btn-outline-dark btn-lg search-buton search-p"
                      type="button">
                      <i className="fa fa-search" />
                    </button>{" "}
                  </div>
                </div>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className="col-xl-2 col-lg-2 col-md-4 col-4">
                <div className="logo">
                  <Link href="/">
                    <a>
                      <img
                        src={
                          darkBg ? "img/logo/logo3.png" : "img/logo/logo.png"
                        }
                        alt=""
                      />
                    </a>
                  </Link>
                </div>
              </div>
            </Fragment>
          )}
          <div className="col-xl-2 col-lg-2 col-md-7 col-6 order-1 order-md-3 mb-2">
            <div
              className={`header-left-icon ${
                darkBg ? "header-right-icon" : ""
              } d-flex align-items-center f-right`}>
              <WishlistIcon />
              <UserIcon />
              <CartIcon />
            </div>
          </div>
          <div className="col-2 col-md-1 d-block d-lg-none order-1 order-md-3 mb-2">
            <HamburgerIcon darkBg={darkBg} sidebarActive={() => setSidebar()} />
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-12 col-lg-12 col-md-12 d-none d-lg-block mt-20 borderet">
      <div
        className={`main-menu ${
          darkBg ? " main-menu-3" : ""
        } text-center py-2`}>
        <Menu />
      </div>
    </div>
  </header>
);

export const Layout3 = ({
  setSidebar,
  setActiveSearchBar,
  news,
  filterByName,
}) => {
  const [text, setText] = useState(false);
  if (text) {
    Router.push(
      {
        pathname: "/shop",
      },
      undefined,
      { shallow: true }
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText(true);
  };
  return (
    <header className="header-h-five common-space-5">
      {news}
      <div className="header-menu-two">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-xl-2 col-lg-2 col-md-4 col-4">
              <div className="logo">
                <Link href="/index">
                  <a>
                    <img src="/img/logo/logo.png" alt="" />
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6 col-md-9 d-none d-lg-block">
              <div className="main-menu main-menu-five">
                <Menu />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 d-lg-none d-xl-block col-md-7 d-none">
              <div className="search-five ml-35">
                <form onSubmit={(e) => onSubmit(e)}>
                  <input
                    type="text"
                    placeholder="Search For Fruit, Vegetables.."
                    onChange={(e) => filterByName(e.target.value)}
                  />
                  <button type="submit">
                    <i className="far fa-search" />
                  </button>
                </form>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-7 col-6">
              <div className="header-left-icon header-left-icon-5 d-flex align-items-center f-right">
                <UserIcon />
                <WishlistIcon />
                <CompareIcon />
                <div className="shop-cart shop-cart-5 d-none d-sm-inline-block">
                  <div className="text-end">
                    <Link href="/cart">
                      <a>
                        <h6 className="d-none d-md-inline-block">
                          Shopping Bag <span>2</span>
                        </h6>
                        <h6 className="d-inline-block d-md-none">
                          Cart <span>2</span>
                        </h6>
                        <div className="cart-price">$ 275.50</div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2 col-md-1 d-block d-lg-none">
              <HamburgerIcon sidebarActive={() => setSidebar()} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const DefaultLayout = ({ setActiveSearchBar, setSidebar, news }) => (
  <header>
    {news}
    <div className="product-details-header ml-35 mr-35">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-xl-5 col-lg-6 col-md-12 d-none d-lg-block">
            <div className="main-menu product-details-menu">
              <Menu />
            </div>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-4 col-5">
            <Logo />
          </div>
          <div className="col-xl-5 col-lg-3 col-md-7 col-5 header-6-padd">
            <div className="header-left-icon d-flex align-items-center f-right">
              <SearchIcon hendelChangeSearch={() => setActiveSearchBar()} />
              <UserIcon />
              <WishlistIcon />
              <CompareIcon />
              <CartIcon />
            </div>
          </div>
          <div className="col-2 col-md-1 d-block d-lg-none">
            <HamburgerIcon sidebarActive={() => setSidebar()} />
          </div>
        </div>
      </div>
    </div>
  </header>
);
