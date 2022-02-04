import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { Fragment, useRef } from "react";
import { connect } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import {
  side_mobile_menu,
  has_dropdown,
  close_mobile_menu,
  body_overlay,
  slide_bar,
} from "./MobileMenu.module.css";
import InnerMobileMenu from "../header/InnerMobileMenu";
import useDetectOutside from "../../hooks/useDetectOutside";
import { useSelector } from "react-redux";

const MobileMenu = ({ menu, sidebarActive, sidebarClose }) => {
  const user = useSelector((state) => state.auth);
  const { t } = useTranslation("common");
  const menuRef = useRef(null);

  useDetectOutside(menuRef, sidebarClose);

  return (
    <Fragment>
      <aside
        ref={menuRef}
        className={`${slide_bar}`}
        style={{
          right: sidebarActive ? "0" : "-360px",
        }}>
        <div className={close_mobile_menu}>
          <a
            href="#"
            onClick={(e) => {
              sidebarClose();
              e.preventDefault();
            }}>
            <i className="fas fa-times" />
          </a>
        </div>
        <nav className={side_mobile_menu}>
          <MetisMenu id="mobile-menu-active" className="metismenu">
            {user.uid && user.state === "user_registered" && (
              <h6 className="text-center fw-bold">Hoşgeldin, {user.name}</h6>
            )}
            <li className={has_dropdown}>
              <Link href="/shop/brandlist">
                <a className="text-uppercase">Hesabım</a>
              </Link>
              <ul className="submenu submenu-three mm-collapse">
                {user.state === "user_registered" ? (
                  <>
                    <li>
                      <Link href="/dashboard">
                        <a>Profilim</a>
                      </Link>
                    </li>
                    <li>Siparişlerim</li>
                    <li>Adreslerim</li>
                    <li>İndirimlerim</li>
                    <li onClick={handleLogOut}>Çıkış</li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login">
                        <a>Giriş Yap</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        <a>Kayıt Ol</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/dashboard">
                        <a>Sipariş Listesi</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </li>
            <li>
              <Link href="/">
                <a className="text-uppercase">{t("menu.home")}</a>
              </Link>
            </li>
            <li>
              <Link href="/shop/brandlist">
                <a className="text-uppercase">{t("menu.brands")}</a>
              </Link>
            </li>

            {menu &&
              menu.map(
                ({ selectedCategoryName, categoryID, subcategories }, i) => (
                  <li
                    key={`${categoryID}?=)${i}`}
                    className={`text-uppercase ${has_dropdown}`}>
                    <Link
                      href={{
                        pathname: "/shop",
                        query: {
                          categoryIds: categoryID,
                          brandIds: "",
                          searchPrice: "",
                        },
                      }}>
                      <a>{selectedCategoryName}</a>
                    </Link>
                    <InnerMobileMenu
                      allItems={categoryID}
                      subcategories={subcategories}
                    />
                  </li>
                )
              )}

            <li>
              <Link href="/contact">
                <a className="text-uppercase">{t("menu.contact")}</a>
              </Link>
            </li>
          </MetisMenu>
        </nav>
      </aside>
      <div
        className={`${body_overlay} ${sidebarActive ? "active" : ""}`}
        onClick={sidebarClose}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu.menuData,
});

export default connect(mapStateToProps)(MobileMenu);
