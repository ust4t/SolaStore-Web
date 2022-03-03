import React, { createRef, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";

import Preloader from "../src/layout/Preloader";
import { StoreContext } from "../src/context/StoreProvider";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import Loader from "../src/components/Loader";
import sources from "../sources";
import { SET_COMPLETED_CART } from "../src/context/types";
import { SET_CART_DATA_REDUX } from "../src/redux/action/type";
import CartCard from "../src/components/Cards/CartCard/CartCard";

const DEF_SELLER = 9999;

const Cart = ({ saleTeam }) => {
  const { t } = useTranslation("cart");
  const { auth, cart } = useSelector((state) => state);
  const { cartActions, state, isCartLoading, dispatch } =
    useContext(StoreContext);
  const dispatchRedux = useDispatch();
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
  const [couponCode, setCouponCode] = useState(cart.coupon);
  const sellerRef = createRef();
  const sellerBoxRef = createRef();

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

  const totalPrice = (items, discount = 0) => {
    if (items) {
      const total = items.reduce((a, b) => {
        return a + b.price * b.quantity;
      }, 0);
      return Math.ceil(total - discount);
    }

    return 0;
  };

  const handleSeller = (seller) => setCurrentSeller(seller);

  const handleCartSubmit = async (values, { resetForm }, paymentRoute) => {
    if (!state.cartData.length) {
      toast.error(t("cartEmpty"), {
        duration: 3000,
        position: "top-left",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/payment/addOrderVisitor", {
        buyerName: values.name,
        buyerPhone: values.tel.replace(/\+/g, ""),
        salesRepresantID: currentSeller.id,
        visitorGuidID: auth.uid.toString(),
        os: "Desktop",
        paymentType,
        isCompleted: true,
        coupon: cart.coupon,
      });
      resetForm();
      setCurrentSeller(null);

      dispatch({
        type: SET_COMPLETED_CART,
        payload: {
          orderID: data.data,
          amount: totalPrice(
            state.cartData,
            (cart.discount / 100) * totalPrice(state.cartData)
          ),
          buyerName: values.name,
          buyerPhone: values.tel.replace(/\+/g, ""),
          paymentType,
          carts: state.cartData,
        },
      });
      dispatchRedux({
        type: SET_CART_DATA_REDUX,
        payload: {
          discount: {
            discountRate: 0,
            total: 0,
            oldPrice: 0,
          },
          coupon: "string",
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
      toast.error(t("common:error"), {
        duration: 3000,
        position: "top-left",
      });
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const preventKey = (keyEvent) =>
    (keyEvent.charCode || keyEvent.keyCode) === 13 && keyEvent.preventDefault();

  const handleDiscount = async () => {
    if (!couponCode.length) {
      toast.error(t("couponTitle"), {
        position: "top-center",
      });
      return;
    }
    if (!state.cartData.length) {
      toast.error(t("cartEmpty"), {
        position: "top-center",
      });
      return;
    }
    try {
      const { data } = await axios.post("/api/payment/addOrderVisitor", {
        visitorGuidID: auth.uid.toString(),
        coupon: couponCode,
        buyerName: "000",
        buyerPhone: "000",
        salesRepresantID: 0,
        paymentType: "Order",
        os: "Desktop",
        isCompleted: false,
      });
      dispatchRedux({
        type: SET_CART_DATA_REDUX,
        payload: {
          coupon: couponCode,
          discount: data.data,
        },
      });
      toast.success(t("couponSuccess"), {
        position: "top-center",
      });
    } catch (e) {
      toast.error(t("couponError"), {
        position: "top-center",
      });
    }
  };

  const handleRemoveDiscount = () => {
    dispatchRedux({
      type: SET_CART_DATA_REDUX,
      payload: {
        discount: {
          discountRate: 0,
          total: 0,
          oldPrice: 0,
        },
        coupon: "string",
      },
    });
    setCouponCode("");
  };

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
                    onClick={() => {
                      handleSeller({
                        id: DEF_SELLER,
                        name: "orderFirst",
                        img: "/images/representer.jpg",
                      });
                      if (typeof window !== "undefined") {
                        window.scrollTo({
                          top: sellerBoxRef.current.offsetTop,
                          behavior: "smooth",
                        });
                      }
                    }}
                    className="col-5 d-flex justify-content-center cursor-pointer">
                    <img
                      className={`representers ${
                        currentSeller && currentSeller.id === DEF_SELLER
                          ? "border border-2 border-danger"
                          : ""
                      }`}
                      src="/images/representer.jpg"
                      alt="representers"
                    />
                  </div>
                  <h4 className="fs-5 fw-bold text-center mb-20">
                    Karina - Tatyana <br />({t("orderFirst")})
                  </h4>

                  {saleTeam.map(({ id, name, pictureGuidName }, i) => (
                    <div
                      key={`${id}_?=${i}`}
                      onClick={() => {
                        handleSeller({
                          id,
                          name,
                          img: `${sources.saleTeam}/${pictureGuidName}`,
                        });
                        if (typeof window !== "undefined") {
                          window.scrollTo({
                            top: sellerBoxRef.current.offsetTop,
                            behavior: "smooth",
                          });
                        }
                      }}
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
                        <div className=" px-md-4 px-2 pt-3">
                          <div>
                            {isCartLoading ? (
                              <Loader />
                            ) : state.cartData && state.cartData.length > 0 ? (
                              state.cartData.map((cart, i) => (
                                <CartCard
                                  key={`${cart.productID}.|.${i}`}
                                  cart={cart}
                                  onCartRemove={(e) =>
                                    removeFromCart(e, {
                                      id: cart.productID,
                                    })
                                  }
                                  onCartIncrease={incrementQuantity}
                                  onCartDecrease={decrementQuantity}
                                />
                              ))
                            ) : (
                              <h2 className="pt-100 pb-50 text-center w-100">
                                {t("cartEmpty")}
                              </h2>
                            )}
                          </div>

                          <div className="container">
                            <div className="row py-3">
                              <div className="col-12 col-md p00 mb-20 mt-15">
                                <div className="col-lg-11 mr-20">
                                  <div className="d-flex justify-content-center justify-content-md-between pb-3">
                                    <small className="text-muted">
                                      {t("couponTitle")}
                                    </small>
                                  </div>
                                  <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-md-start align-items-center">
                                    <input
                                      value={couponCode}
                                      onChange={(e) =>
                                        setCouponCode(e.target.value)
                                      }
                                      type="text"
                                      className="border border-secondary rounded py-2 ps-2 mb-2 mb-sm-0"
                                      placeholder={t("couponPlaceholder")}
                                    />
                                    <div
                                      onClick={
                                        !!cart.discount.discountRate
                                          ? handleRemoveDiscount
                                          : handleDiscount
                                      }
                                      className="kpnbut">
                                      {!!cart.discount.discountRate
                                        ? t("couponRemove")
                                        : t("couponApply")}
                                    </div>
                                  </div>
                                  {!!cart.discount.discountRate &&
                                  state.cartData.length ? (
                                    <p
                                      style={{
                                        fontSize: "16px",
                                      }}
                                      className="text-danger mt-2">
                                      * {t("couponInfo")}
                                    </p>
                                  ) : null}
                                </div>
                              </div>

                              <div className="col p00  mb-20">
                                <div className="col-lg-12">
                                  <div className="d-flex flex-column">
                                    {cart.discount.discountRate &&
                                    state.cartData.length ? (
                                      <>
                                        <div className="d-flex justify-content-between">
                                          <small className="text-muted fs-5">
                                            {t("cartAmount")}
                                          </small>
                                          <del className="text-danger fs-5">
                                            ${totalPrice(state.cartData)}
                                          </del>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between p-2 my-2 bg-success">
                                          <small className="text-white fw-bold fs-5">
                                            {t("discountTitle")}
                                          </small>
                                          <p className="text-white fs-5 mb-0">
                                            $
                                            {Math.floor(
                                              (cart.discount.discountRate /
                                                100) *
                                                (state.cartData || [])
                                                  .filter(
                                                    (item) =>
                                                      item.oldPrice === 0
                                                  )
                                                  .reduce(
                                                    (a, b) =>
                                                      a + b.price * b.quantity,
                                                    0
                                                  )
                                            )}
                                          </p>
                                        </div>
                                      </>
                                    ) : null}

                                    <div className="d-flex justify-content-between">
                                      <small className="text-muted fw-bold fs-5">
                                        {t("totalAmount")}
                                      </small>
                                      <p className="fw-bold fs-5">
                                        $
                                        {totalPrice(
                                          state.cartData,
                                          (cart.discount.discountRate / 100) *
                                            (state.cartData || [])
                                              .filter(
                                                (item) => item.oldPrice === 0
                                              )
                                              .reduce(
                                                (a, b) =>
                                                  a + b.price * b.quantity,
                                                0
                                              )
                                        )}
                                      </p>
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
                  <div ref={sellerBoxRef} className="col-lg-4 payment-summary">
                    {!!currentSeller && (
                      <div className="d-flex flex-column align-items-center justify-content-center mb-20 mt-20">
                        <h5 className="text-secondary">
                          {t("salesRepresentative")}
                        </h5>
                        {currentSeller.id === DEF_SELLER ? (
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
                          {currentSeller.id === DEF_SELLER
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
                        } else
                          handleCartSubmit(values, { resetForm }, "/checkout");
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
                              setPaymentType("Order");
                              if (!currentSeller) {
                                toast.error(t("orderChoose"), {
                                  duration: 3000,
                                  position: "top-left",
                                });
                                warningTimed("sellerWarning", 5000);
                                return;
                              }
                            }}
                            className="btn grenbtn1 mb-10"
                            style={{ width: "100%", fontSize: "1.4rem" }}>
                            <i
                              className="fas fa-dollar-sign"
                              style={{ marginRight: "5px" }}></i>
                            {t("orderCurrent")}
                          </button>
                          <button
                            type="submit"
                            onClick={() => {
                              setPaymentType("cc");
                              if (!currentSeller) {
                                toast.error(t("orderChoose"), {
                                  duration: 3000,
                                  position: "top-left",
                                });
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
