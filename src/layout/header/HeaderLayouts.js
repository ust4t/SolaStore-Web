import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import {
  CartIcon,
  HamburgerIcon,
  HomeIcon,
  Logo,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "./Icons/Icons";
import { WhatsappIcon } from "react-share";
import Menu from "./Menu";
import useDetectScroll from "../../hooks/useDetectScroll";

export const Layout2 = ({ setSidebar, darkBg, news }) => {
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const searchRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleSearch = () => {
    push({
      pathname: "/search",
      query: {
        searchText: searchRef.current.value,
      },
    });
  };

  useDetectScroll(handleScroll);

  return (
    <header className={` ${darkBg ? "black-bg" : ""}`}>
      {news}
      <a
        href="https://api.whatsapp.com/send?phone=905554000005"
        className="position-fixed z-index-first"
        target="_blank"
        style={{
          left: "20px",
          bottom: "20px",
        }}>
        <WhatsappIcon size={55} round={true} />
      </a>

      <div
        className="position-fixed bg-white d-block d-lg-none"
        style={{
          width: "100vw",
          zIndex: "400",
          top: showMenu ? "0" : "-200px",
          visibility: showMenu ? "visible" : "hidden",
          transition: "all 0.5s ease-in-out",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}>
        <div className="row align-items-center justify-content-center">
          <div
            className={`col-2 main-menu z-index-first ${
              darkBg ? " main-menu-3" : ""
            } text-center py-2`}>
            <HamburgerIcon darkBg={darkBg} sidebarActive={setSidebar} />
          </div>

          <div className="col-6">
            <div className="input-group">
              <input
                ref={searchRef}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                className="form-control input-text"
                placeholder={t("search")}
                aria-label
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  onClick={handleSearch}
                  className="btn btn-outline-dark btn-lg search-buton search-p"
                  type="button">
                  <i className="fa fa-search" />
                </button>{" "}
              </div>
            </div>
          </div>

          <div className="col-4">
            <div
              className="header-left-icon d-flex"
              style={{
                gap: "15px",
              }}>
              <HomeIcon />
              <WishlistIcon />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      <div
        className="position-fixed bg-white d-none d-lg-block"
        style={{
          width: "100vw",
          zIndex: "400",
          top: showMenu ? "0" : "-200px",
          visibility: showMenu ? "visible" : "hidden",
          transition: "all 0.5s ease-in-out",
          boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
        }}>
        <div className="row align-items-center justify-content-center">
          <div
            className={`col-7 main-menu z-index-first ${
              darkBg ? " main-menu-3" : ""
            } text-center py-2`}>
            <Menu />
          </div>

          <div className="col-2">
            <div className="input-group">
              {" "}
              <input
                ref={searchRef}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                type="text"
                className="form-control input-text"
                placeholder={t("search")}
                aria-label
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                {" "}
                <button
                  onClick={handleSearch}
                  className="btn btn-outline-dark btn-lg search-buton search-p"
                  type="button">
                  <i className="fa fa-search" />
                </button>{" "}
              </div>
            </div>
          </div>

          <div className="col-2">
            <div className="header-left-icon d-flex">
              <HomeIcon />
              <WishlistIcon />
              <UserIcon />
              <CartIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="header-menu-area logo-circle-area">
        <div className="container-fluid">
          <div className="row align-items-center gx-0 justify-content-center justify-content-lg-center">
            <Fragment>
              <div className="col-1 col-md-1 d-block d-lg-none">
                <HamburgerIcon darkBg={darkBg} sidebarActive={setSidebar} />
              </div>
              <div className="col-xl-2 col-lg-2 col-md-4 col-4 text-center d-none d-lg-block order-1">
                <div className="logo d-flex justify-content-lg-start">
                  <Link href="/">
                    <a>
                      <Image
                        src={
                          darkBg ? "/img/logo/logo3.png" : "/img/logo/logo.png"
                        }
                        alt="Logo"
                        width={120}
                        height={80}
                        layout="intrinsic"
                        priority={true}
                      />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="col-6 d-block order-md-2">
                <div className="input-group">
                  {" "}
                  <input
                    ref={searchRef}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    type="text"
                    className="form-control input-text"
                    placeholder={t("search")}
                    aria-label
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    {" "}
                    <button
                      onClick={handleSearch}
                      className="btn btn-outline-dark btn-lg search-buton search-p"
                      style={{
                        padding: ".5rem 0.5rem",
                      }}
                      type="button">
                      <i className="fa fa-search" />
                    </button>{" "}
                  </div>
                </div>
              </div>
            </Fragment>

            <div className="col-xl-2 col-lg-3 col-md-4 col-5 order-1 order-md-3">
              <div
                className={`header-left-icon ${
                  darkBg ? "header-right-icon" : ""
                } ms-auto d-flex justify-content-around justify-content-xl-center align-items-center f-right`}>
                <HomeIcon />
                <WishlistIcon />
                <UserIcon />
                <CartIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 d-none d-lg-block mt-20 borderet ">
        <div
          className={`main-menu z-index-first ${
            darkBg ? " main-menu-3" : ""
          } text-center py-2`}>
          <Menu />
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
              <SearchIcon hendelChangeSearch={setActiveSearchBar} />
              <UserIcon />
              <WishlistIcon />
              <CartIcon />
            </div>
          </div>
          <div className="col-2 col-md-1 d-block d-lg-none">
            <HamburgerIcon sidebarActive={setSidebar} />
          </div>
        </div>
      </div>
    </div>
  </header>
);
