import React, { useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import Preloader from "../src/layout/Preloader";
import CartAmount from "../src/components/cart/CartAmount";
import { StoreContext } from "../src/context/StoreProvider";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import Loader from "../src/components/Loader";
import sources from "../sources";
import { SET_COMPLETED_CART } from "../src/context/types";

const Cart = ({ saleTeam }) => {
  const { t } = useTranslation("cart");
  const auth = useSelector((state) => state.auth);
  // const chooseId = auth.state === "guest" ? auth.uid : auth.rnd_id;
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
  const [warning, setWarning] = useState({
    sellerWarning: "",
  });
  const sellerRef = React.createRef();

  const paymentValidationSchema = Yup.object({
    name: Yup.string().required(t("validationName")),
    tel: Yup.string().required(t("validationTel")),
  });

  const warningTimed = (target, timeout = 3000) => {
    if (typeof window !== "undefined" && sellerRef.current) {
      window.scrollTo({
        top: sellerRef.current.offsetTop,
        behavior: "smooth",
      });
    }
    if (!warning[target]) {
      setTimeout(() => {
        setWarning({
          ...warning,
          [target]: "",
        });
      }, timeout);
      setWarning({
        ...warning,
        [target]: "border border-3 rounded-3 border-danger",
      });
    }
  };

  const removeFromCart = (e, { id }) => {
    e.preventDefault();
    const cartData = {
      id,
      user: auth.uid,
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

  const handleCartSubmit = async (values, { resetForm }, paymentRoute) => {
    if (!state.cartData.length) {
      toast.error("Sepetinizde ürün bulunmamaktadır.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/payment/addOrderVisitor", {
        buyerName: values.name,
        buyerPhone: values.tel.replace(/\+/g, ""),
        salesRepresantID: currentSeller.id,
        visitorGuidID: auth.uid.toString(),
        os: "desktop",
        paymentType,
      });
      resetForm();
      setCurrentSeller(null);
      dispatch({
        type: SET_COMPLETED_CART,
        payload: {
          orderID: data.data,
          amount: totalPrice(state.cartData),
          buyerName: values.name,
          buyerPhone: values.tel.replace(/\+/g, ""),
          paymentType,
          carts: state.cartData,
        },
      });
      cartRefetch();
      router.push({
        pathname: paymentRoute,
        query: {
          orderID: data.data,
          user: auth.uid,
        },
      });
    } catch (err) {
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const preventKey = (keyEvent) =>
    (keyEvent.charCode || keyEvent.keyCode) === 13 && keyEvent.preventDefault();

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      {isLoading && <Preloader />}
      <main>
        <PageTitle
          active={t("breadcrumb")}
          pageTitle={t("title")}
          navigation={false}
        />

        <section className="cart-area pt-20 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2 className="text-center fw-bold ">{t("orderTitle")}</h2>
                <h5 className="text-center fw-bold text-danger">
                  {t("orderDesc")}
                </h5>
              </div>
              <div className="col-12 mt-20 d-flex flex-column justify-content-center">
                <div
                  ref={sellerRef}
                  className={`row justify-content-center ${warning.sellerWarning}`}>
                  <h3 className="fw-bold text-center fs-4 fs-md-1">
                    {t("orderChoose")}
                  </h3>
                  <div
                    onClick={() =>
                      handleSeller({
                        id: 9999,
                        name: "orderFirst",
                        img: "/images/representer.jpg",
                      })
                    }
                    className={`col-5 d-flex justify-content-center cursor-pointer ${
                      currentSeller && currentSeller.id === 9999
                        ? "border border-2 border-danger"
                        : ""
                    }`}>
                    <img
                      className="representers"
                      src="/images/representer.jpg"
                      alt="representers"
                    />
                  </div>
                  <h4 className="fs-5 fw-bold text-center mb-20">
                    {/* {t("orderFirst")} */}
                    Karina - Tatyana <br />
                    (For new orders)
                  </h4>

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
                      className={`col-4 col-lg-2 mt-3 d-flex flex-column align-items-center mustem cursor-pointer ${
                        currentSeller && currentSeller.id === id
                          ? "border border-2 border-danger"
                          : ""
                      }`}>
                      <Image
                        src={`${sources.saleTeam}/${pictureGuidName}`}
                        alt={name}
                        className="rounded-circle"
                        width={110}
                        height={110}
                        // layout=""
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
                      {t("cartInfo")}
                    </p>
                    <div className="card">
                      <div className="ribbon ribbon-top-right">
                        <span>{t("cartTitle")}</span>
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
                                          <Link
                                            href={{
                                              pathname: `/detail/${cart.productShortName
                                                .toLowerCase()
                                                .replace(" ", "-")}:${
                                                cart.productID
                                              }`,
                                              query: {
                                                selected: cart.productID,
                                              },
                                            }}>
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
                                            href={{
                                              pathname: `/detail/${cart.productShortName
                                                .toLowerCase()
                                                .replace(" ", "-")}:${
                                                cart.productID
                                              }`,
                                              query: {
                                                selected: cart.productID,
                                              },
                                            }}>
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
                                            ${Number(cart.price).toFixed(2)}
                                          </span>
                                        </p>
                                        {/* <p className="text-muted text-decoration-line-through">
                                          $55.00
                                        </p> */}
                                      </div>
                                    </td>
                                    <CartAmount
                                      incrementQuantity={incrementQuantity}
                                      decrementQuantity={decrementQuantity}
                                      productID={cart.productID}
                                      cart={cart}
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
                                  {t("cartEmpty")}
                                </h2>
                              )}
                            </tbody>
                          </table>

                          <div className="container">
                            <div className="row py-3">
                              {/*
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
                                */}
                              <div className="col p00  mb-20">
                                <div className="col-lg-12">
                                  <div className="d-flex flex-column">
                                    <div className="d-flex justify-content-between">
                                      {" "}
                                      <small className="text-muted">
                                        {t("cartAmount")}
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
                                      <small className="text-muted fw-bold">
                                        {t("totalAmount")}
                                      </small>
                                      <p className="fw-bold">
                                        ${totalPrice(state.cartData)}
                                      </p>
                                    </div>
                                  </div>
                                  {/* <div style={{ display: "none" }}>
                                    <div className="sale1 my-3">
                                      Geçersiz Kod{" "}
                                    </div>
                                    <div className="true1 my-3">
                                      Kupon Uygulandı{" "}
                                    </div>
                                  </div> */}
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
                        <h5 className="text-secondary">
                          {t("salesRepresentative")}
                        </h5>
                        {currentSeller.id === 9999 ? (
                          <img
                            className="representers"
                            src={currentSeller.img}
                            alt={currentSeller.name}
                          />
                        ) : (
                          <Image
                            src={currentSeller.img}
                            alt={currentSeller.name}
                            className="rounded-circle align-self-center"
                            width={"100px"}
                            height={"100px"}
                            layout="fixed"
                          />
                        )}
                        <h3 className="fw-bold text-center">
                          {currentSeller.id === 9999
                            ? t(currentSeller.name)
                            : currentSeller.name}
                        </h3>
                      </div>
                    )}
                    <p className="fw-bold pt-lg-0 pt-4 pb-2 text-secondary mt-20">
                      {t("orderInfo")}
                    </p>
                    <Formik
                      initialValues={{
                        name: "",
                        tel: "",
                      }}
                      validationSchema={paymentValidationSchema}
                      onSubmit={(values, { resetForm }) => {
                        if (paymentType === "Order") {
                          handleCartSubmit(
                            values,
                            { resetForm },
                            "/order-success"
                          );
                        } else {
                          handleCartSubmit(values, { resetForm }, "/checkout");
                        }
                      }}>
                      {({ values, errors, touched, handleChange }) => (
                        <Form onKeyDown={preventKey}>
                          <div className="form-group mb-10">
                            <input
                              value={values.name}
                              onChange={handleChange("name")}
                              type="text"
                              className={`form-control txth ${
                                errors.name && touched.name
                                  ? "border border-3 rounded-3 border-danger"
                                  : ""
                              }`}
                              placeholder={t("orderName")}
                              // required
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
                              type="text"
                              className={`form-control txth ${
                                errors.tel && touched.tel
                                  ? "border border-3 rounded-3 border-danger"
                                  : ""
                              }`}
                              placeholder={t("orderTel")}
                              // required
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
                              if (!currentSeller) {
                                toast.error("Lütfen bir satıcı seçiniz.");
                                warningTimed("sellerWarning", 5000);
                                return;
                              }
                            }}
                            className="btn grenbtn1 mb-10"
                            style={{ width: "100%" }}>
                            <i
                              className="fas fa-credit-card"
                              style={{ marginRight: "5px" }}></i>
                            {t("orderCredit")}
                          </button>
                          <button
                            type="submit"
                            onClick={() => {
                              setPaymentType("Order");
                              if (!currentSeller) {
                                toast.error("Lütfen bir satıcı seçiniz.");
                                warningTimed("sellerWarning", 5000);
                                return;
                              }
                            }}
                            className="btn grenbtn1 mb-10"
                            style={{ width: "100%" }}>
                            <i
                              className="fas fa-dollar-sign"
                              style={{ marginRight: "5px" }}></i>
                            {t("orderCurrent")}
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

export async function getStaticProps() {
  const { data: saleTeam } = await axios.get(
    `https://api.solastore.com.tr/api/User/GetSalesReps?sourceProof=${process.env.SOURCE_PROOF}`
  );
  return {
    props: {
      saleTeam,
    },
  };
}
