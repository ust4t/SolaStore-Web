import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import {
  addToCart,
  addWishlist,
  getWishlist,
} from "../src/redux/action/utilis";

const Wishlist = ({ getWishlist, addToCart, addWishlist }) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);
  useEffect(() => {
    getWishlist();
  }, []);

  const [addCart, setaddCart] = useState(false);
  const [addWishlist_, setAddWishlist_] = useState(false);

  return (
    <Layout sticky textCenter container footerBg>
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
                            <th className="product-subtotal">Total</th>
                            <th className="product-remove">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist &&
                            wishlist.map((wishlist) => (
                              <tr key={wishlist.id}>
                                <td className="product-thumbnail">
                                  <a href="#">
                                    <img src={wishlist.img} alt="wishlist" />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a href="#">{wishlist.name}</a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(wishlist.mainPrice).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <Link href="#">
                                    <a
                                      className="bt-btn theme-btn-2"
                                      onClick={(e) => {
                                        addToCart(wishlist);
                                        e.preventDefault();
                                        setaddCart(true);
                                        toast.success("Add item in Cart.");
                                      }}
                                    >
                                      Add TO Cart
                                    </a>
                                  </Link>
                                </td>
                                <td className="product-subtotal">
                                  <span className="amount">
                                    ${Number(wishlist.mainPrice).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-remove">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      addWishlist(wishlist);
                                      e.preventDefault();
                                      toast.error("Remove item in wishlist.");
                                      setAddWishlist_(true);
                                    }}
                                  >
                                    <i className="fa fa-times" />
                                  </a>
                                </td>
                              </tr>
                            ))}
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
