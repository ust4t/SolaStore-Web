import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import {
  addToCart,
  decreaseCart,
  removeCart,
} from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";

const Cart = ({ removeCart, addToCart, decreaseCart }) => {
  const carts = useSelector((state) => state.utilis.carts);
  console.log("🤯 carts", carts);
  const [cartValue, setCartValue] = useState(0);

  const [addCart, setaddCart] = useState(false);

  const onClickCart = (e, cart) => {
    e.preventDefault();
    addToCart(cart);
    setaddCart(true);
    toast.success("Add item in Cart.");
  };
  const onClickRemoveCart = (e, cart) => {
    e.preventDefault();
    decreaseCart(cart);
    setaddCart(true);
    toast.error("Remove item from Cart.");
  };
  return (
    <Layout sticky footerBg container textCenter>
      <main>
        <PageTitle active="Cart" pageTitle="Shoping Cart" />

        {carts && carts.length > 0 ? (
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
                          {carts &&
                            carts.map((cart) => (
                              <tr key={cart.id}>
                                <td className="product-thumbnail">
                                  <a href="#">
                                    <img src={cart.img} alt="cart" />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a href="#">{cart.name}</a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(cart.mainPrice).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <div className="cart-plus-minus">
                                    <input
                                      type="text"
                                      value={cart.qty}
                                      disabled
                                    />
                                    <div
                                      className="dec qtybutton"
                                      onClick={(e) =>
                                        cart.qty !== 1 &&
                                        onClickRemoveCart(e, cart)
                                      }
                                    >
                                      -
                                    </div>
                                    <div
                                      className="inc qtybutton"
                                      onClick={(e) => onClickCart(e, cart)}
                                    >
                                      +
                                    </div>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  <span className="amount">
                                    ${Number(cart.totalPrice).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-remove">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      removeCart(cart.id);
                                      setaddCart(true);
                                      toast.error("Remove Item from cart.");
                                      e.preventDefault();
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
                    <div className="row">
                      <div className="col-12">
                        <div className="coupon-all">
                          <div className="coupon">
                            <form onSubmit={(e) => e.preventDefault()}>
                              <input
                                id="coupon_code"
                                className="input-text"
                                name="coupon_code"
                                placeholder="Coupon code"
                                type="text"
                              />
                              <button
                                className="bt-btn theme-btn-2"
                                name="apply_coupon"
                                type="submit"
                                onClick={(e) => e.preventDefault()}
                              >
                                Apply coupon
                              </button>
                            </form>
                          </div>
                          <div className="coupon2">
                            <Link href="/checkout">
                              <a className="bt-btn theme-btn-2">Submit</a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5 ml-auto">
                        <div className="cart-page-total">
                          <h2>Cart totals</h2>
                          <ul className="mb-20">
                            <li>
                              Subtotal <span>${totalPrice(carts)}</span>
                            </li>
                            <li>
                              Total <span>${totalPrice(carts)}</span>
                            </li>
                          </ul>
                          <Link href="/checkout">
                            <a className="bt-btn theme-btn-2">
                              Proceed to checkout
                            </a>
                          </Link>
                        </div>
                      </div>
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

export default connect(null, { removeCart, addToCart, decreaseCart })(Cart);
