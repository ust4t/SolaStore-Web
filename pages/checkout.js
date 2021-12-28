// import swal from "@sweetalert/with-react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Formik } from "formik";
import Router from "next/router";
import { useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import InputGroup from "../src/components/form/InputGroup";
import SelectGroup from "../src/components/form/SelectGroup";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { setCheckoutData } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";
import {
  checkoutSchema,
  couponSchema,
  loginSchema,
} from "../src/utils/yupModal";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Checkout = ({ setCheckoutData }) => {
  const carts = useSelector((state) => state.utilis.carts);
  const [freeShpping, setFreeShpping] = useState(false);
  const [flat, setFlat] = useState(false);
  const price = totalPrice(carts);
  let shppingPrice = 30,
    flatPrice = 7;

  const [activeId, setActiveId] = useState(false);
  const [active2, setActive2] = useState(false);
  const [active3, setActive3] = useState(false);
  const [active4, setActive4] = useState(false);

  const countrys = [
    "bangladesh",
    "Algeria",
    "Afghanistan",
    "Ghana",
    "Albania",
    "Bahrain",
    "Colombia",
    "Dominican Republic",
  ];

  return (
    <Layout sticky textCenter container footerBg>
      <main>
        <PageTitle active="Checkout" pageTitle="Checkout" />

        <section className="coupon-area pt-100 pb-30">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="coupon-accordion">
                  {/* ACCORDION START */}
                  <h3>
                    Returning customer?{" "}
                    <span id="showlogin" onClick={() => setActiveId(!activeId)}>
                      Click here to login
                    </span>
                  </h3>
                  <div className={`custom-acc ${activeId ? "show" : ""}`}>
                    <div id="checkout-login" className={`coupon-content `}>
                      <div className="coupon-info">
                        <p className="coupon-text">
                          Quisque gravida turpis sit amet nulla posuere lacinia.
                          Cras sed est sit amet ipsum luctus.
                        </p>
                        <Formik
                          initialValues={loginSchema.initialValue}
                          validationSchema={loginSchema.schema}
                          onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              setSubmitting(false);
                            }, 400);
                          }}
                        >
                          {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <p className="form-row-first">
                                <InputGroup
                                  label="Email Address"
                                  id="email"
                                  name="email"
                                  type="string"
                                  placeholder="Enter Username or Email address..."
                                  values={values.email}
                                  errors={errors.email}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                />
                              </p>
                              <p className="form-row-last">
                                <InputGroup
                                  label="Password"
                                  id="password"
                                  name="password"
                                  type="password"
                                  placeholder="Enter password..."
                                  values={values.password}
                                  errors={errors.password}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                />
                              </p>
                              <p className="form-row">
                                <button
                                  className="bt-btn theme-btn"
                                  disabled={isSubmitting}
                                >
                                  Login
                                </button>
                                <label>
                                  <input type="checkbox" className="mr-1" />
                                  Remember me
                                </label>
                              </p>
                              <p className="lost-password">
                                <a href="#">Lost your password?</a>
                              </p>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                  {/* ACCORDION END */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="coupon-accordion">
                  <h3>
                    Have a coupon?{" "}
                    <span id="showcoupon" onClick={() => setActive2(!active2)}>
                      Click here to enter your code
                    </span>
                  </h3>
                  <div className={`custom-acc ${active2 ? "show" : ""}`}>
                    <div
                      id="checkout_coupon"
                      className="coupon-checkout-content"
                    >
                      <div className="coupon-info">
                        <Formik
                          initialValues={couponSchema.initialValue}
                          validationSchema={couponSchema.schema}
                          onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                              setSubmitting(false);
                            }, 400);
                          }}
                        >
                          {({
                            values,
                            errors,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                          }) => (
                            <form onSubmit={handleSubmit}>
                              <p className="checkout-coupon">
                                <input
                                  className="mb-0"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.coupon}
                                  name="coupon"
                                  placeholder="Coupon Code"
                                />

                                <div
                                  id="val-username1-error"
                                  className="invalid-feedback animated fadeInUp mb-3"
                                  style={{ display: "block" }}
                                >
                                  {errors.coupon && errors.coupon}
                                </div>
                                <button
                                  disabled={isSubmitting}
                                  className="bt-btn theme-btn"
                                  type="submit"
                                >
                                  Apply Coupon
                                </button>
                              </p>
                            </form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Formik
          initialValues={checkoutSchema.initialValue}
          validationSchema={checkoutSchema.schema}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert("Checkout successfully completed");
              Router.push(
                {
                  pathname: "/order-success",
                },
                undefined,
                { shallow: true }
              );

              setCheckoutData(values);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <section className="checkout-area pb-70">
              <div className="container">
                <form action="#" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkbox-form">
                        <h3>Billing Details</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="country-select">
                              <SelectGroup
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                name="country"
                                id="country"
                                values={values.country}
                                errors={errors.country}
                                options={countrys}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="fName"
                                id="fName"
                                label="First Name"
                                errors={errors.fName}
                                values={values.fName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="lName"
                                id="lName"
                                label="Last Name"
                                errors={errors.lName}
                                values={values.lName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="cName"
                                id="cName"
                                label="Company Name"
                                errors={errors.cName}
                                values={values.cName}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="address"
                                id="address"
                                label="Address"
                                placeholder="Street address"
                                errors={errors.address}
                                values={values.address}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <input
                                type="text"
                                placeholder="Apartment, suite, unit etc. (optional)"
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="city"
                                id="city"
                                label="Town / City"
                                placeholder="Town / City"
                                errors={errors.city}
                                values={values.city}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="state"
                                id="state"
                                label="State / County"
                                placeholder="State / County"
                                errors={errors.state}
                                values={values.state}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="zip"
                                id="zip"
                                label="Postcode / Zip"
                                placeholder="Postcode / Zip"
                                errors={errors.zip}
                                values={values.zip}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="email"
                                id="email"
                                label="Email Address"
                                type="email"
                                errors={errors.email}
                                values={values.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="phone"
                                id="phone"
                                label="Phone"
                                errors={errors.phone}
                                values={values.phone}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list create-acc">
                              <input
                                id="cbox"
                                type="checkbox"
                                onClick={() => setActive3(!active3)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="createAccount"
                              />
                              <label>Create an account?</label>
                            </div>
                            <div
                              className={`custom-acc ${active3 ? "show" : ""}`}
                            >
                              <div
                                id="cbox_info"
                                className="checkout-form-list create-account"
                              >
                                <p>
                                  Create an account by entering the information
                                  below. If you are a returning customer please
                                  login at the top of the page.
                                </p>
                                <InputGroup
                                  name="password2"
                                  id="password2"
                                  label="Account password"
                                  type="password"
                                  errors={errors.password2}
                                  values={values.password2}
                                  handleBlur={handleBlur}
                                  handleChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="different-address">
                          <div className="ship-different-title">
                            <h3>
                              <label>Ship to a different address?</label>
                              <input
                                id="ship-box"
                                type="checkbox"
                                onClick={() => setActive4(!active4)}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="defferentAddress"
                              />
                            </h3>
                          </div>
                          <div
                            className={`custom-acc ${active4 ? "show" : ""}`}
                          >
                            <div id="ship-box-info">
                              <div className="row">
                                <div className="col-md-12">
                                  <div className="country-select">
                                    <SelectGroup
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                      name="country2"
                                      id="country2"
                                      values={values.country2}
                                      errors={errors.country2}
                                      options={countrys}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="fName2"
                                      id="fName2"
                                      label="First Name"
                                      errors={errors.fName2}
                                      values={values.fName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="lName2"
                                      id="lName2"
                                      label="Last Name"
                                      errors={errors.lName2}
                                      values={values.lName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="cName2"
                                      id="cName2"
                                      label="Company Name"
                                      errors={errors.cName2}
                                      values={values.cName2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="address2"
                                      id="address2"
                                      label="Address2"
                                      placeholder="Street address"
                                      errors={errors.address2}
                                      values={values.address2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="checkout-form-list">
                                    <input
                                      type="text"
                                      placeholder="Apartment, suite, unit etc. (optional)"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="city2"
                                      id="city2"
                                      label="Town / City"
                                      placeholder="Town / City"
                                      errors={errors.city2}
                                      values={values.city2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="state2"
                                      id="state2"
                                      label="State / County"
                                      placeholder="State / County"
                                      errors={errors.state2}
                                      values={values.state2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="zip2"
                                      id="zip2"
                                      label="Postcode / Zip"
                                      placeholder="Postcode / Zip"
                                      errors={errors.zip2}
                                      values={values.zip2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="email2"
                                      id="email2"
                                      label="Email Address"
                                      type="email"
                                      errors={errors.email2}
                                      values={values.email2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="checkout-form-list">
                                    <InputGroup
                                      name="phone2"
                                      id="phone2"
                                      label="Phone"
                                      errors={errors.phone2}
                                      values={values.phone2}
                                      handleBlur={handleBlur}
                                      handleChange={handleChange}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="order-notes">
                            <div className="checkout-form-list">
                              <label>Order Notes</label>
                              <textarea
                                id="checkout-mess"
                                cols={30}
                                rows={10}
                                placeholder="Notes about your order, e.g. special notes for delivery."
                                defaultValue={""}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="your-order mb-30 ">
                        <h3>Your order</h3>
                        <div className="your-order-table table-responsive">
                          <table>
                            <thead>
                              <tr>
                                <th className="product-name">Product</th>
                                <th className="product-total">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {carts &&
                                carts.map((cart) => (
                                  <tr className="cart_item" key={cart.id}>
                                    <td className="product-name">
                                      {cart.name}{" "}
                                      <strong className="product-quantity">
                                        {" "}
                                        × {cart.qty}
                                      </strong>
                                    </td>
                                    <td className="product-total">
                                      <span className="amount">
                                        ${Number(cart.totalPrice).toFixed(2)}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                            <tfoot>
                              <tr className="cart-subtotal">
                                <th>Cart Subtotal</th>
                                <td>
                                  <span className="amount">${price}</span>
                                </td>
                              </tr>
                              <tr className="shipping">
                                <th>Shipping</th>
                                <td>
                                  <ul>
                                    <li>
                                      <input
                                        type="radio"
                                        checked={flat}
                                        onClick={() => setFlat(!flat)}
                                        id="flat"
                                      />{" "}
                                      <label htmlFor="flat">
                                        Flat Rate:{" "}
                                        <span className="amount">
                                          ${flatPrice.toFixed(2)}
                                        </span>
                                      </label>
                                    </li>
                                    <li>
                                      <input
                                        type="radio"
                                        id="shipping"
                                        checked={freeShpping}
                                        onClick={() =>
                                          setFreeShpping(!freeShpping)
                                        }
                                      />{" "}
                                      <label htmlFor="shipping">
                                        Free Shipping: $
                                        {shppingPrice.toFixed(2)}
                                      </label>
                                    </li>
                                    <li />
                                  </ul>
                                </td>
                              </tr>
                              <tr className="order-total">
                                <th>Order Total</th>
                                <td>
                                  <strong>
                                    {price && (
                                      <span className="amount">
                                        $
                                        {flat && freeShpping
                                          ? (
                                              price -
                                              flatPrice -
                                              shppingPrice
                                            ).toFixed(2)
                                          : flat
                                          ? (price - flatPrice).toFixed(2)
                                          : freeShpping
                                          ? (price - shppingPrice).toFixed(2)
                                          : price}
                                      </span>
                                    )}
                                  </strong>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                        <div className="payment-method">
                          <Accordion defaultActiveKey="0">
                            <Card>
                              <Card.Header>
                                <h5 className="mb-0">
                                  <Accordion.Toggle
                                    className="btn-link"
                                    as="button"
                                    eventKey="0"
                                  >
                                    Direct Bank Transfer
                                  </Accordion.Toggle>
                                </h5>
                              </Card.Header>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  Make your payment directly into our bank
                                  account. Please use your Order ID as the
                                  payment reference. Your order won’t be shipped
                                  until the funds have cleared in our account.
                                  <div className="mt-3">
                                    <Elements stripe={stripePromise}>
                                      <CardElement className="form-control" />
                                    </Elements>
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>

                            <Card>
                              <Card.Header>
                                <h5 className="mb-0">
                                  <Accordion.Toggle
                                    className="btn-link"
                                    as="button"
                                    eventKey="1"
                                  >
                                    Cheque Payment
                                  </Accordion.Toggle>
                                </h5>
                              </Card.Header>
                              <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                  Please send your cheque to Store Name, Store
                                  Street, Store Town, Store State / County,
                                  Store Postcode.
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>

                            <Card>
                              <Card.Header>
                                <h5 className="mb-0">
                                  <Accordion.Toggle
                                    className="btn-link"
                                    as="button"
                                    eventKey="2"
                                  >
                                    PayPal
                                  </Accordion.Toggle>
                                </h5>
                              </Card.Header>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body>
                                  Pay via PayPal; you can pay with your credit
                                  card if you don’t have a PayPal account.
                                  <div className="mt-3">
                                    <PayPalScriptProvider
                                      options={{ "client-id": "test" }}
                                    >
                                      <PayPalButtons
                                        style={{ layout: "horizontal" }}
                                      />
                                    </PayPalScriptProvider>
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                          <div className="order-button-payment mt-20">
                            <button
                              type="submit"
                              className="bt-btn theme-btn"
                              disabled={
                                carts && carts.length <= 0 ? true : isSubmitting
                              }
                            >
                              Place order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </section>
          )}
        </Formik>
      </main>
    </Layout>
  );
};

export default connect(null, { setCheckoutData })(Checkout);
