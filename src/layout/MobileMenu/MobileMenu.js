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

const MobileMenu = ({ menu, sidebarActive, sidebarClose }) => {
  const { t } = useTranslation("common");
  const menuRef = useRef(null);

  console.log(menuRef);

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
            <li>
              <Link href="/">
                <a>{t("menu.home")}</a>
              </Link>
            </li>
            <li>
              <Link href="/shop/brandlist">
                <a>{t("menu.brands")}</a>
              </Link>
            </li>
            {menu &&
              menu.map(
                ({ selectedCategoryName, categoryID, subcategories }, i) => (
                  <li key={`${categoryID}?=)${i}`} className={has_dropdown}>
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
                    <InnerMobileMenu subcategories={subcategories} />
                  </li>
                )
              )}

            <li>
              <Link href="/">
                <a>{t("menu.contact")}</a>
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
