import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { Fragment, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import toast from "react-hot-toast";
import Router from "next/router";

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
import { CREATE_USER_ID } from "../../redux/action/type";

const MobileMenu = ({ menu, sidebarActive, sidebarClose }) => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const menuRef = useRef(null);

  useDetectOutside(menuRef, sidebarClose);

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get("/api/auth/logOut");
      dispatch({
        type: CREATE_USER_ID,
        payload: { ...data },
      });
      toast.success("Çıkış yapıldı");
      Router.push("/");
    } catch (e) {
      toast.error("Çıkış yapılırken hata oluştu");
    }
  };

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
            <li>
              <Link href="/">
                <a className="text-uppercase">{t("menu.home")}</a>
              </Link>
            </li>
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
                    <li>
                      <Link href="/orders">
                        <a>Siparişlerim</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/orders">
                        <a>Adreslerim</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders">
                        <a>İndirimlerim</a>
                      </Link>
                    </li> */}
                    <li onClick={handleLogOut}>
                      <a href="#">Çıkış</a>
                    </li>
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
                      <Link href="/orders">
                        <a>Sipariş Listesi</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
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
