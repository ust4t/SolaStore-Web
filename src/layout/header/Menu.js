import { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { getMenu } from "../../redux/action/menu";
import SubMenu from "./SubMenu";

const Menu = ({ getMenu, menu }) => {
  return (
    <nav id="mobile-menu-four">
      <ul>
        <SubMenu />
        {/* {!!menu && menu.data.map(({selectedCategoryName,categoryID})=>{
          <li>
          <Link href="/">
          <a>{selectedCategoryName}</a>
        </Link>
        <SubMenu id={categoryID} />
        </li>
        })} */}

        {/* <li>
          <Link href="/about">
            <a>About</a>
          </Link>
        </li>
        <li className="mega-menu">
          <Link href="/shop">
            <a>Shop</a>
      
          </Link>
          <ul className="submenu ">
            <li>
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Category View
                </a>
              </Link>
              <ul className="submenu ">
                <li>
                  <Link href="/shop/col-2">
                    <a>Shop 2 Column</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/right-sidebar">
                    <a>Shop 2 Right Sidebar</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/col-4">
                    <a>Shop 4 Column Full</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/list-view">
                    <a>Shop List View</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/col-4">
                    <a>Shop No Sidebar</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Category View
                </a>
              </Link>
              <ul className="submenu">
                <li>
                  <Link href="/shop">
                    <a>Sidebar Left</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/right-sidebar">
                    <a>Sidebar Right</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/col-4">
                    <a>Style 01</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop/right-sidebar">
                    <a>Style 02</a>
                  </Link>
                </li>
                <li>
                  <Link href="/shop">
                    <a>Style 03</a>
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  Product View
                </a>
              </Link>
              <ul className="submenu">
                <li>
                  <Link href="/shop/1">Simple Product</Link>
                </li>
                <li>
                  <Link href="/shop/101">Product Upcoming</Link>
                </li>
                <li>
                  <Link href="/shop/up-thumb/16">Thumb Top Product</Link>
                </li>

                <li>
                  <Link href="/compare">Compare</Link>
                </li>
                <li>
                  <Link href="/wishlist">wishlist</Link>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/blog">
            <a>News</a>
          </Link>
          <ul className="submenu">
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
        <li>
          <Link href="#">
            <a
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Pages
            </a>
          </Link>
          <ul className="submenu">
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
        </li> */}
      </ul>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu.menuData,
});

export default connect(mapStateToProps, { getMenu })(Menu);
