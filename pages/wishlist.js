import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { StoreContext } from "../src/context/StoreProvider";
import {
  addToCart,
  addWishlist,
  getWishlist,
} from "../src/redux/action/utilis";
import sources from "../sources";

const Wishlist = ({ getWishlist, addToCart, addWishlist }) => {
  const { state, wishListActions, cartActions } = useContext(StoreContext);
  const { removeFromWishList } = wishListActions;
  const { addToCartAction } = cartActions;

  const wishlist = state.wishlistData;
  // const wishlist = useSelector((state) => state.utilis.wishlist);
  // useEffect(() => {
  //   getWishlist();
  // }, []);

  const handleWishlistRemove = (id) => {
    removeFromWishList({
      id,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
  };

  const handleAddToCart = (id) => {
    addToCartAction({
      id,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
  };

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle active="Wishlist" pageTitle="Wishlist" />
        {wishlist && wishlist.length > 0 ? (
          <section className="cart-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="product-price">Unit Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-remove">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist &&
                            wishlist.map(
                              (
                                {
                                  picture_1,
                                  productID,
                                  productShortName,
                                  singlePrice,
                                },
                                i
                              ) => (
                                <tr key={`${productID}--*?${i}`}>
                                  <td className="product-thumbnail">
                                    <a>
                                      <img
                                        src={`${sources.imageMidSrc}${picture_1}`}
                                        alt="wishlist"
                                      />
                                    </a>
                                  </td>
                                  <td className="product-name">
                                    <a href="#">{productShortName}</a>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      ${Number(singlePrice).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-quantity">
                                    <Link href="#">
                                      <a
                                        className="bt-btn theme-btn-2"
                                        onClick={() =>
                                          handleAddToCart(productID)
                                        }>
                                        Add TO Cart
                                      </a>
                                    </Link>
                                  </td>
                                  <td className="product-remove">
                                    <a
                                      href="#"
                                      onClick={() =>
                                        handleWishlistRemove(productID)
                                      }>
                                      <i className="fa fa-times" />
                                    </a>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <h2 className="pt-100 pb-50 text-center w-100">No Product Found</h2>
        )}
      </main>
    </Layout>
  );
};

export default connect(null, { getWishlist, addToCart, addWishlist })(Wishlist);
