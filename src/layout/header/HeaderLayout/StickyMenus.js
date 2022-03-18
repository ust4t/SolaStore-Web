import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  CartIcon,
  HamburgerIcon,
  HomeIcon,
  UserIcon,
  WishlistIcon,
} from "../Icons";
import Menu from "../Menu";
import Search from "../Search";

import { stickyMobile } from "./HeaderLayout.module.css";

export default function StickyMenus({
  showMenu,
  handleSearch,
  setSidebar,
  searchRef,
  layout,
}) {
  const { t } = useTranslation("common");

  const mobile = (
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
        <div className={`col-7 main-menu z-index-first text-center`}>
          <Menu />
        </div>

        <div className="col-2">
          <div className="input-group">
            <Search
              handleSearch={handleSearch}
              searchRef={searchRef}
              placeholder={t("search")}
            />
          </div>
        </div>

        <div className="col-2 px-lg-0">
          <div className="header-left-icon d-flex">
            <HomeIcon />
            <WishlistIcon />
            <UserIcon />
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );

  const desktop = (
    <div
      className="position-fixed bg-white d-block d-lg-none"
      style={{
        width: "100vw",
        zIndex: "400",
        top: showMenu ? "0" : "-200px",
        visibility: showMenu ? "visible" : "hidden",
        transition: "all 0.3s ease-in-out",
        boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
      }}>
      <div className="row align-items-center justify-content-center">
        <div className={`col-2 main-menu z-index-first text-center py-2`}>
          <HamburgerIcon sidebarActive={setSidebar} />
        </div>

        <div className="col-5 col-sm-6 px-0 px-sm-2">
          <div className="input-group">
            <Search
              handleSearch={handleSearch}
              searchRef={searchRef}
              placeholder={t("search")}
            />
          </div>
        </div>

        <div className="col-4 px-0 px-sm-2">
          <div className={`header-left-icon d-flex ${stickyMobile}`}>
            <HomeIcon />
            <WishlistIcon />
            <CartIcon />
          </div>
        </div>
      </div>
    </div>
  );

  return layout === "desktop" ? desktop : mobile;
}
