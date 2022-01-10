import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import CartAmount from "../src/components/cart/CartAmount";
import { StoreContext } from "../src/context/StoreProvider";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import Loader from "../src/components/Loader";
import {
  addToCart,
  decreaseCart,
  removeCart,
} from "../src/redux/action/utilis";
import sources from "../sources";

const saleTeam = [
  {
    name: "Fatıma",
    img: "/img/team/team1.jpg",
  },
  {
    name: "Galya",
    img: "/img/team/team2.jpg",
  },
  {
    name: "İsmail",
    img: "/img/team/team3.jpg",
  },
  {
    name: "Lena",
    img: "/img/team/team4.jpg",
  },
  {
    name: "Marina",
    img: "/img/team/team5.jpg",
  },
  {
    name: "Mustafa",
    img: "/img/team/team6.jpg",
  },
  {
    name: "Sevkan",
    img: "/img/team/team7.jpg",
  },
];

const Cart = () => {
  const { cartActions, state, isCartLoading } = useContext(StoreContext);
  const {
    removeFromCart: removeFromCartAction,
    incrementQuantity,
    decrementQuantity,
  } = cartActions;

  console.log(state.cartData);
  // const [addCart, setaddCart] = useState(false);

  const removeFromCart = (e, { id }) => {
    const cartData = {
      id,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };
    removeFromCartAction(cartData);

    e.preventDefault();
  };

  const totalPrice = (items) => {
    if (items) {
      const totalPrice = items.reduce((a, b) => {
        return a + b.price * b.quantity;
      }, 0);
      return totalPrice;
    }

    return 0;
  };

  return (
    <Layout sticky footerBg container textCenter>
      <main>
        <PageTitle active="Cart" pageTitle="Shoping Cart" />

        <section className="cart-area pt-20 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center fw-bold ">
                  SİPARİŞ TAMAMLAMA SAYFASI
                </h2>
                <h5 className="text-center fw-bold text-danger">
                  Siparişinizi Güvenle Tamamlayabilirsiniz. Siparişinizi
                  tamamladığınızda, ödeme ve kargo gönderim konusunda satış
                  ekibimiz sizi arayacak.
                </h5>
              </div>
              <div className="col-12 mt-20 d-flex flex-column justify-content-center">
                <h3 className="fw-bold text-center">
                  LÜTFEN SATIŞ TEMSİLCİNİZİ SEÇİNİZ
                </h3>
                <i
                  className="fas fa-user text-center py-1"
                  style={{
                    fontSize: "7.3rem",
                  }}></i>
                <h4 className="fs-5 fw-bold text-center">
                  İlk siparişim. Satış temsilcim yok.
                </h4>
                <div className="row">
                  {saleTeam.map(({ name, img }, index) => (
                    <div className="col-4 col-lg-2 mt-3 d-flex flex-column align-items-center mustem">
                      <Image
                        src={img}
                        alt={name}
                        className="rounded-circle"
                        width={"150px"}
                        height={"150px"}
                        layout="fixed"
                      />

                      <h5 className="fs-4 mt-1 fw-bold text-center">{name}</h5>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-12">
                <div className="row px-md-4 px-2 pt-4">
                  <div className="col-lg-8">
                    <p className="pb-2 fw-bold text-secondary">
                      Ürünlerinizi Buradan İnceleyebilirsiniz
                    </p>
                    <div className="card">
                      <div className="ribbon ribbon-top-right">
                        <span>SEPETİNİZ</span>
                      </div>
                      <div>
                        <div className="table-responsive px-md-4 px-2 pt-3">
                          <table
                            className="table table-borderless"
                            style={{ marginBottom: "0rem" }}>
                            <tbody>
                              {isCartLoading ? (
                                <Loader />
                              ) : state.cartData &&
                                state.cartData.length > 0 ? (
                                state.cartData.map((cart) => (
                                  <tr className="border-bottom">
                                    <td>
                                      <div className="d-flex align-items-center ord">
                                        <div>
                                          {" "}
                                          <Link
                                            href={`/detail/${cart.productID}`}>
                                            <a>
                                              <img
                                                className="pic"
                                                src={`${sources.imageMinSrc}${cart.pictureOneGuidName}`}
                                                alt=""
                                              />
                                            </a>
                                          </Link>
                                        </div>
                                        <div className="ps-3 d-flex flex-column justify-content">
                                          <Link
                                            href={`/detail/${cart.productID}`}>
                                            <p className="fw-bold text-secondary">
                                              <a>{cart.productShortName}</a>
                                            </p>
                                          </Link>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="sept40">
                                        <p className="pe-3">
                                          <span className="red">
                                            {" "}
                                            ${Number(cart.price).toFixed(2)}
                                          </span>
                                        </p>
                                        <p className="text-muted text-decoration-line-through">
                                          $55.00
                                        </p>
                                      </div>
                                    </td>
                                    <CartAmount
                                      incrementQuantity={incrementQuantity}
                                      decrementQuantity={decrementQuantity}
                                      productID={cart.productID}
                                      cart={cart}
                                      isCartLoading={isCartLoading}
                                    />
                                    <td>
                                      <div className="sept40">
                                        <p className="pe-3">
                                          <span className="red">
                                            $
                                            {Number(cart.price).toFixed(2) *
                                              cart.quantity}
                                          </span>
                                        </p>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="sept40">
                                        <a
                                          href="#"
                                          onClick={(e) =>
                                            removeFromCart(e, {
                                              id: cart.productID,
                                            })
                                          }>
                                          <i className="fa fa-times" />
                                        </a>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <h2 className="pt-100 pb-50 text-center w-100">
                                  No Product Found
                                </h2>
                              )}
                            </tbody>
                          </table>

                          <div className="container">
                            <div className="row py-3">
                              <div className="col p00  mb-20 mt-15">
                                <div className="col-lg-11 mr-20">
                                  <div className="d-flex justify-content-between pb-3">
                                    {" "}
                                    <small className="text-muted">
                                      Kupon Kodunuz Varsa Kodunuzu Giriniz
                                    </small>
                                    <p className=""></p>
                                  </div>
                                  <div className="d-flex justify-content-between align-items-center">
                                    {" "}
                                    <input
                                      type="text"
                                      className="border border-secondary rounded kpninput"
                                      placeholder="Kupon Kodu Giriniz"
                                    />
                                    <div className="kpnbut">Uygula</div>
                                  </div>
                                </div>
                              </div>
                              <div className="col p00  mb-20">
                                <div className="col-lg-12">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted">
                                        Sepet Tutar
                                      </small>
                                      <p>${totalPrice(state.cartData)}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted fw-bold red">
                                        İndirim Tutarı
                                      </small>
                                      <p className="red">$20</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted fw-bold">
                                        Toplam Tutar
                                      </small>
                                      <p className="fw-bold">$80</p>
                                    </div>
                                  </div>
                                  <div style={{ display: "none" }}>
                                    <div className="sale1 my-3">
                                      Geçersiz Kod{" "}
                                    </div>
                                    <div className="true1 my-3">
                                      Kupon Uygulandı{" "}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 payment-summary">
                    <p className="fw-bold pt-lg-0 pt-4 pb-2 text-secondary">
                      Bilgilerinizi Giriniz
                    </p>
                    <form>
                      <div className="form-group mb-10">
                        <input
                          type="text"
                          className="form-control txth"
                          id="BuyerName"
                          placeholder="İsim Soyisim Giriniz"
                        />
                      </div>
                      <div className="form-group mb-10">
                        <input
                          type="text"
                          className="form-control txth"
                          id="BuyerPhone"
                          placeholder="Telefonunuz Giriniz"
                        />
                      </div>

                      <button
                        type="submit"
                        className="btn grenbtn1 mb-10"
                        style={{ width: "100%" }}>
                        <i
                          className="fas fa-credit-card"
                          style={{ marginRight: "5px" }}></i>
                        Kredi Kartı ile Öde
                      </button>
                      <button
                        type="submit"
                        className="btn grenbtn1 mb-10"
                        style={{ width: "100%" }}>
                        <i
                          className="fas fa-dollar-sign"
                          style={{ marginRight: "5px" }}></i>
                        Cari Hesap ile Öde
                      </button>
                    </form>
                  </div>
                </div>

                {/* 
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
                          {state.cartData &&
                            state.cartData.map((cart) => (
                              <tr key={cart.chartID}>
                                <td className="product-thumbnail">
                                  <Link href={`/detail/${cart.productID}`}>
                                    <a>
                                      <img
                                        src={`https://solastore.com.tr/img/ProductWM/maxPic/${cart.pictureOneGuidName}`}
                                        alt="cart"
                                      />
                                    </a>
                                  </Link>
                                </td>
                                <td className="product-name">
                                  <Link href={`/detail/${cart.productID}`}>
                                    <a>{cart.productShortName}</a>
                                  </Link>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(cart.price).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <CartAmount
                                    incrementQuantity={incrementQuantity}
                                    decrementQuantity={decrementQuantity}
                                    productID={cart.productID}
                                    cart={cart}
                                    isCartLoading={isCartLoading}
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
                                  {isCartLoading ? (
                                    "Loading..."
                                  ) : (
                                    <a
                                      href="#"
                                      onClick={(e) =>
                                        removeFromCart(e, {
                                          id: cart.productID,
                                        })
                                      }>
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
                                onClick={(e) => e.preventDefault()}>
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
                              Total <span>${totalPrice(state.cartData)}</span>
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
                  </form> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default connect(null, { removeCart, addToCart, decreaseCart })(Cart);
