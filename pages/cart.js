import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone";
import toast from "react-hot-toast";

import Preloader from "../src/layout/Preloader";
import CartAmount from "../src/components/cart/CartAmount";
import { StoreContext } from "../src/context/StoreProvider";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import Loader from "../src/components/Loader";
import sources from "../sources";
import { SET_COMPLETED_CART } from "../src/context/types";

const Cart = ({ saleTeam }) => {
  const { cartActions, state, isCartLoading, dispatch } =
    useContext(StoreContext);
  const router = useRouter();
  const {
    removeFromCart: removeFromCartAction,
    incrementQuantity,
    decrementQuantity,
    cartRefetch,
  } = cartActions;
  const [currentSeller, setCurrentSeller] = useState(null);
  const [paymentType, setPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const paymentValidationSchema = Yup.object({
    name: Yup.string().required("Adınızı giriniz."),
    tel: Yup.string().required("Telefon numaranızı giriniz."),
  });

  const removeFromCart = (e, { id }) => {
    e.preventDefault();
    const cartData = {
      id,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    };
    removeFromCartAction(cartData);
  };

  const totalPrice = (items) => {
    if (items) {
      const total = items.reduce((a, b) => {
        return a + b.price * b.quantity;
      }, 0);
      return total;
    }

    return 0;
  };

  const handleSeller = (seller) => setCurrentSeller(seller);

  const handleSubmit = async (values, { resetForm }) => {
    if (!currentSeller) {
      toast.error("Lütfen bir satıcı seçiniz.");
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await axios.post("/api/payment/addOrderVisitor", {
        buyerName: values.name,
        buyerPhone: values.tel.replace(/\+/g, ""),
        salesRepresantID: currentSeller.id,
        visitorGuidID: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
        paymentType,
      });
      resetForm();
      setCurrentSeller(null);
      dispatch({
        type: SET_COMPLETED_CART,
        payload: state.cartData,
      });
      cartRefetch();
      router.push({
        pathname: "/order-success",
        query: {
          orderID: data.data,
          user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
          buyerName: values.name,
          buyerPhone: values.tel.replace(/\+/g, ""),
          paymentType,
        },
      });
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const preventKey = (keyEvent) =>
    (keyEvent.charCode || keyEvent.keyCode) === 13 && keyEvent.preventDefault();

  return (
    <Layout sticky footerBg container textCenter>
      {isLoading && <Preloader />}
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
                <div className="row">
                  <i
                    className="fas fa-user text-center py-1"
                    style={{
                      fontSize: "7.3rem",
                    }}></i>
                  <h4 className="fs-5 fw-bold text-center mb-20">
                    İlk siparişim. Satış temsilcim yok.
                  </h4>
                  <h3 className="fw-bold text-center">
                    LÜTFEN SATIŞ TEMSİLCİNİZİ SEÇİNİZ
                  </h3>
                  {saleTeam.map(({ id, name, pictureGuidName }, i) => (
                    <div
                      key={`${id}_?=${i}`}
                      onClick={() =>
                        handleSeller({
                          id,
                          name,
                          img: `${sources.saleTeam}/${pictureGuidName}`,
                        })
                      }
                      className="col-4 col-lg-2 mt-3 d-flex flex-column align-items-center mustem cursor-pointer">
                      <Image
                        src={`${sources.saleTeam}/${pictureGuidName}`}
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
                                {/* <div className="col-lg-11 mr-20">
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
                                </div> */}
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
                                    {/* <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted fw-bold red">
                                        İndirim Tutarı
                                      </small>
                                      <p className="red">$20</p>
                                    </div> */}
                                    <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted fw-bold">
                                        Toplam Tutar
                                      </small>
                                      <p className="fw-bold">
                                        ${totalPrice(state.cartData)}
                                      </p>
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
                    {!!currentSeller && (
                      <div className="d-flex flex-column align-items-center justify-content-center mb-20 mt-20">
                        <h5 className="text-secondary">Satış Temsilcisi</h5>

                        <Image
                          src={currentSeller.img}
                          alt={currentSeller.name}
                          className="rounded-circle align-self-center"
                          width={"100px"}
                          height={"100px"}
                          layout="fixed"
                        />
                        <h3 className="fw-bold text-center">
                          {currentSeller.name}
                        </h3>
                      </div>
                    )}
                    <p className="fw-bold pt-lg-0 pt-4 pb-2 text-secondary mt-20">
                      Bilgilerinizi Giriniz
                    </p>
                    <Formik
                      initialValues={{
                        name: "",
                        tel: "",
                      }}
                      validationSchema={paymentValidationSchema}>
                      {({ values, errors, touched, handleChange }) => (
                        <Form onKeyDown={preventKey}>
                          <div className="form-group mb-10">
                            <input
                              value={values.name}
                              onChange={handleChange("name")}
                              type="text"
                              className="form-control txth"
                              placeholder="İsim Soyisim Giriniz"
                              required
                            />
                          </div>
                          {errors.name && touched.name ? (
                            <div>
                              <p className="text-danger">{errors.name}</p>
                            </div>
                          ) : null}
                          <div className="form-group mb-10">
                            <input
                              value={values.tel}
                              onChange={handleChange("tel")}
                              type="tel"
                              className="form-control txth"
                              placeholder="Telefonunuz Giriniz"
                              required
                            />
                          </div>
                          {errors.tel && touched.tel ? (
                            <div>
                              <p className="text-danger">{errors.tel}</p>
                            </div>
                          ) : null}

                          <button
                            type="submit"
                            onClick={() => {
                              setPaymentType("cc");
                              alert("Ödeme Yapıldı");
                            }}
                            className="btn grenbtn1 mb-10"
                            style={{ width: "100%" }}>
                            <i
                              className="fas fa-credit-card"
                              style={{ marginRight: "5px" }}></i>
                            Kredi Kartı ile Öde
                          </button>
                          <button
                            type="submit"
                            onClick={() => {
                              setPaymentType("order");
                              handleSubmit();
                            }}
                            className="btn grenbtn1 mb-10"
                            style={{ width: "100%" }}>
                            <i
                              className="fas fa-dollar-sign"
                              style={{ marginRight: "5px" }}></i>
                            Cari Hesap ile Öde
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Cart;

export async function getServerSideProps() {
  const { data: saleTeam } = await axios.get(
    `https://api.solastore.com.tr/api/User/GetSalesReps?sourceProof=${process.env.SOURCE_PROOF}`
  );
  return {
    props: {
      saleTeam,
    },
  };
}
