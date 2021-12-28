import MetisMenu from "@metismenu/react";
import Link from "next/link";
import { Fragment } from "react";
const MobileMenu = ({ sidebarActive, sidebarClose }) => {
  return (
    <Fragment>
      <aside className={`slide-bar ${sidebarActive}`}>
        <div className="close-mobile-menu">
          <a
            href="#"
            onClick={(e) => {
              sidebarClose();
              e.preventDefault();
            }}
          >
            <i className="fas fa-times" />
          </a>
        </div>
        {/* side-mobile-menu start */}
        <nav className="side-mobile-menu">
          <MetisMenu id="mobile-menu-active" className="metismenu">
            <li className="has-dropdown">
              <Link href="/">
                <a>Home</a>
              </Link>
              <ul className="submenu submenu-three mm-collapse">
                <li>
                  <Link href="/">
                    <a>Home Style 1</a>
                  </Link>
                </li>
                <li>
                  <Link href="/index-2">
                    <a>Home Style 2</a>
                  </Link>
                </li>
                <li>
                  <Link href="/index-3">
                    <a>Home Style 3</a>
                  </Link>
                </li>
                <li>
                  <Link href="/index-4">
                    <a>Home Style 4</a>
                  </Link>
                </li>
                <li>
                  <Link href="/index-5">
                    <a>Home Style 5</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            
            <li className="has-dropdown">
              <Link href="/blog">
                <a>News</a>
              </Link>
              <ul className="submenu mm-collapse">
                <li>
                  <Link href="/blog">
                    <a>Blog Standart</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/left-sidebar">
                    <a>Blog Left Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/no-sidebar">
                    <a>Blog No Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/col-2">Blog 2 Column</Link>
                </li>
                <li>
                  <Link href="/blog/col-mas-2">
                    <a>Blog 2 Col Masonry</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/col-3">
                    <a>Blog 3 Column</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/col-mas-3">
                    <a>Blog 3 Col Masonry</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/1">
                    <a>Blog Details</a>
                  </Link>
                </li>
                <li>
                  <Link href="/blog/10">
                    <a>Blog Details Video</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="has-dropdown">
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Pages
                </a>
              </Link>{" "}
              <ul className="submenu mm-collapse">
                <li>
                  <Link href="/about">
                    <a>About Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <a>Contact Us</a>
                  </Link>
                </li>
                <li>
                  <Link href="/login">
                    <a>login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                </li>
                <li>
                  <Link href="/cart">
                    <a>Shoping Cart</a>
                  </Link>
                </li>
                <li>
                  <Link href="/checkout">
                    <a>Checkout</a>
                  </Link>
                </li>
                <li>
                  <Link href="/wishlist">
                    <a>Wishlist</a>
                  </Link>
                </li>
                <li>
                  <Link href="/order-success">
                    <a>Order Success</a>
                  </Link>
                </li>
              </ul>
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

export default MobileMenu;
