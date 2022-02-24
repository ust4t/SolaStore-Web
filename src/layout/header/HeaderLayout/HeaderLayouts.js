import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import { WhatsappIcon } from "react-share";
import { useScrollData } from "scroll-data-hook";

import {
  CartIcon,
  HamburgerIcon,
  HomeIcon,
  Logo,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "../Icons/Icons";
import Menu from "../Menu";
import useDetectScroll from "../../../hooks/useDetectScroll";
import StickyMenus from "./StickyMenus";
import NumberModal from "../../../components/Modals/NumberModal";
import {
  loadSession,
  saveToSessionStorage,
} from "../../../redux/browser-storage";

export const Layout2 = ({ setSidebar, darkBg, news }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const searchRef = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [modals, setModals] = useState({
    numberModal: {
      show: false,
      handleClose: () =>
        setModals({
          ...modals,
          numberModal: { ...modals.numberModal, show: false },
        }),
    },
  });
  const { speed } = useScrollData();
  const modalSession = loadSession("numberModal", true);

  const handleScroll = () => {
    if (window.scrollY > 250) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  const handleSearch = () => {
    if (searchRef.current.value === "") return;
    router.push({
      pathname: "/search",
      query: {
        searchText: encodeURI(searchRef.current.value),
      },
    });
  };
  useEffect(() => {
    if (modalSession) {
      setTimeout(() => {
        if (speed.y < 2300)
          setModals({
            ...modals,
            numberModal: { ...modals.numberModal, show: true },
          });
      }, 90000);
    }
  }, []);

  useEffect(() => {
    if (modalSession) {
      if (speed.y > 7000) {
        setModals({
          ...modals,
          numberModal: { ...modals.numberModal, show: true },
        });
        saveToSessionStorage("numberModal", false);
      }
    }
  }, [speed.y]);

  useDetectScroll(handleScroll);

  return (
    <header>
      {news}
      <a
        href="https://api.whatsapp.com/send?phone=905554000005"
        className="position-fixed z-index-first"
        target="_blank"
        style={{
          left: "20px",
          bottom: "80px",
        }}>
        <WhatsappIcon size={55} round={true} />
      </a>

      <StickyMenus
        showMenu={showMenu}
        handleSearch={handleSearch}
        setSidebar={setSidebar}
        searchRef={searchRef}
        layout="desktop"
      />

      <StickyMenus
        showMenu={showMenu}
        handleSearch={handleSearch}
        setSidebar={setSidebar}
        searchRef={searchRef}
        layout="mobile"
      />

      <NumberModal
        show={modals.numberModal.show}
        handleClose={modals.numberModal.handleClose}
      />

      <div className="header-menu-area logo-circle-area cartAnim">
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
                          darkBg
                            ? "/images/logo/logo3.png"
                            : "/images/logo/logo.png"
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
                    <button
                      onClick={handleSearch}
                      className="btn btn-outline-dark btn-lg"
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
                className={`header-left-icon ms-auto d-flex justify-content-around justify-content-xl-center align-items-center f-right`}>
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
        <div className={`main-menu z-index-first text-center`}>
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
