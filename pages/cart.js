import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { connect, useSelector } from "react-redux";
import CartAmount from "../src/components/cart/CartAmount";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import {
  addToCart,
  decreaseCart,
  removeCart,
} from "../src/redux/action/utilis";

const sendDeleteRequest = async (creds) => {
  const { data: response } = await axios.post(
    `/api/cart/removeFromCart?user=${creds.user}&ProductID=${creds.id}`
  );

  return response.data;
};

const Cart = ({ removeCart, addToCart, decreaseCart }) => {
  // const carts = useSelector((state) => state.utilis.carts);
  const [carts, setCarts] = useState([]);
  const queryClient = useQueryClient();

  const { isLoading, error, data, isFetching, refetch } = useQuery(
    "cart",
    () =>
      fetch(
        `/api/cart/getCartItems?user=${"0d1c9955-326f-42fd-b04d-b745b80b70e3"}`
      ).then((res) => res.json()),
    {
      onSuccess: (data) => {
        setCarts(data);
      },
    }
  );

  const { mutate, isLoading: isDeleteLoading } = useMutation(
    "deleteCart",
    sendDeleteRequest,
    {
      onSuccess: (data) => {
        refetch();
        setaddCart(true);
        toast.error("Remove Item from cart.");
      },
      onError: (error) => {
        console.log(error);
        alert(`there was an error ${id}`);
      },
      onSettled: () => {
        queryClient.invalidateQueries("deleteCart");
      },
    }
  );

  const [cartValue, setCartValue] = useState(0);

  const [addCart, setaddCart] = useState(false);

  const removeFromCart = (e, { id }) => {
    removeCart(cart.id);
    const cartData = {
      id,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };
    mutate(cartData);

    e.preventDefault();
  };

  const totalPrice = (items) => {
    const totalPrice = items.reduce((a, b) => {
      return a + b.price * b.quantity;
    }, 0);

    return totalPrice;
  };

  return (
    <Layout sticky footerBg container textCenter>
      <main>
        <PageTitle active="Cart" pageTitle="Shoping Cart" />

        {isLoading ? (
          "Loading..."
        ) : carts && carts.data.length > 0 ? (
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
                            carts.data.map((cart) => (
                              <tr key={cart.chartID}>
                                <td className="product-thumbnail">
                                  <a href="#">
                                    <img
                                      src={`https://solastore.com.tr/img/ProductWM/maxPic/${cart.pictureOneGuidName}`}
                                      alt="cart"
                                    />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a href="#">{cart.productShortName}</a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(cart.price).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <CartAmount
                                    productID={cart.productID}
                                    cart={cart}
                                    refetch={refetch}
                                    setaddCart={setaddCart}
                                    addToCart={addToCart}
                                    decreaseCart={decreaseCart}
                                  />
                                </td>
                                <td className="product-subtotal">
                                  <span className="amount">
                                    $
                                    {Number(cart.price).toFixed(2) *
                                      cart.quantity}
                                  </span>
                                </td>
                                <td className="product-remove">
                                  {isDeleteLoading ? (
                                    "Loading..."
                                  ) : (
                                    <a
                                      href="#"
                                      onClick={(e) =>
                                        removeFromCart(e, {
                                          id: cart.productID,
                                        })
                                      }
                                    >
                                      <i className="fa fa-times" />
                                    </a>
                                  )}
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
                              Total <span>${totalPrice(carts.data)}</span>
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
