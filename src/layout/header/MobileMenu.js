import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getMenu } from "../../redux/action/menu";
import InnerMobileMenu from "./InnerMobileMenu";
const MobileMenu = ({ menu, getMenu, sidebarActive, sidebarClose }) => {
  useEffect(() => {
    getMenu();
  }, []);
  return (
    <Fragment>
      <aside className={`slide-bar ${sidebarActive}`}>
        <div className="close-mobile-menu">
          <a
            href="#"
            onClick={(e) => {
              sidebarClose();
              e.preventDefault();
            }}>
            <i className="fas fa-times" />
          </a>
        </div>
        {/* side-mobile-menu start */}
        <nav className="side-mobile-menu">
          <MetisMenu id="mobile-menu-active" className="metismenu">
            {menu &&
              menu.data.map(({ selectedCategoryName, categoryID }, i) => (
                <li className="has-dropdown">
                  <Link href={`/shop/${categoryID}`}>
                    <a>{selectedCategoryName}</a>
                  </Link>
                  <InnerMobileMenu menuId={categoryID} />
                </li>
              ))}
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>

            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </MetisMenu>
        </nav>
      </aside>
      <div
        className={`body-overlay ${sidebarActive ? "active" : ""}`}
        onClick={() => sidebarClose()}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu.menuData,
});

export default connect(mapStateToProps, { getMenu })(MobileMenu);
