import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState, useRef } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import {
  CartIcon,
  HamburgerIcon,
  Logo,
  SearchIcon,
  UserIcon,
  WishlistIcon,
} from "./Icons";
import Menu from "./Menu";

export const Layout2 = ({ setSidebar, darkBg, news }) => {
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const searchRef = useRef();
  // const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const offset = typeof window !== "undefined" ? window.pageYOffset : 0;
  // const stickyRef = React.useRef();

  const handleScroll = () => {
    if (offset > 100) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  // if (typeof window !== "undefined")
  //   window.addEventListener("scroll", handleScroll);

  const handleSearch = () => {
    push({
      pathname: "/search",
      query: {
        searchText: searchRef.current.value,
      },
    });
  };

  return (
    <header className={` ${darkBg ? "black-bg" : ""}`}>
      {news}

      <div className="header-menu-area logo-circle-area">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-end justify-content-lg-center">
            {/* {logoLeft ? ( */}
            <Fragment>
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
              <div className="col-7 d-block order-md-2">
                <div className="input-group">
                  {" "}
                  <input
                    ref={searchRef}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    type="text"
                    className="form-control input-text p-3 py-2"
                    placeholder={t("search")}
                    aria-label
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    {" "}
                    <button
                      onClick={handleSearch}
                      className="btn btn-outline-dark btn-lg p-3 py-2"
                      type="button">
                      <i className="fa fa-search" />
                    </button>{" "}
                  </div>
                </div>
              </div>
            </Fragment>
            {/* ) : ( */}
            {/* <Fragment>
								<div className='col-xl-2 col-lg-2 col-md-4 col-4'>
									<div className='logo'>
										<Link href='/'>
											<a>
												<img
													src={
														darkBg ? 'img/logo/logo3.png' : 'img/logo/logo.png'
													}
													alt=''
												/>
											</a>
										</Link>
									</div>
								</div>
							</Fragment> */}
            {/* )} */}
            <div className="col-xl-2 col-lg-3 col-md-3 col-4 order-1 order-md-3">
              <div
                className={`header-left-icon ${
                  darkBg ? "header-right-icon" : ""
                } d-flex align-items-center f-right`}>
                <WishlistIcon />
                <UserIcon />
                <CartIcon />
              </div>
            </div>
            <div className="col-1 col-md-1 d-block d-lg-none order-1 order-md-3">
              <HamburgerIcon darkBg={darkBg} sidebarActive={setSidebar} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-12 col-lg-12 col-md-12 d-none d-lg-block mt-20 borderet ">
        <div
          // ref={stickyRef}
          // style={{
          //   ...(scrolled
          //     ? {
          //         width: "100%",
          //         padding: "0px 30px 0 0",
          //         position: "fixed",
          //         background: "#fff",
          //         top: 0,
          //       }
          //     : {}),
          //   transition: "0.5s ease",
          // }}
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
