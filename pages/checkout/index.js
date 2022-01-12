// import swal from "@sweetalert/with-react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Accordion, Card } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import InputGroup from "../../src/components/form/InputGroup";
import SelectGroup from "../../src/components/form/SelectGroup";
import Layout from "../../src/layout/Layout";
import PageTitle from "../../src/layout/PageTitle";
import { setCheckoutData } from "../../src/redux/action/utilis";
import { totalPrice } from "../../src/utils/utils";
import {
  checkoutSchema,
  couponSchema,
  loginSchema,
} from "../../src/utils/yupModal";
import * as Yup from "yup";
import { StoreContext } from "../../src/context/StoreProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { SET_BUYER_DETAILS } from "../../src/context/types";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Checkout = ({ setCheckoutData }) => {
  const { dispatch } = useContext(StoreContext);
  const router = useRouter();
  // const carts = useSelector((state) => state.utilis.carts);
  // const [freeShpping, setFreeShpping] = useState(false);
  // const [flat, setFlat] = useState(false);
  // const price = totalPrice(carts);
  // let shppingPrice = 30,
  //   flatPrice = 7;

  const checkoutInitialValues = {
    cardNumber: "",
    cardHoldersName: "",
    expirationYear: "",
    expirationMonth: "",
    cvv: "",
  };

  const checkoutSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Required")
      .matches(/^[0-9]{16}$/, "Must be 16 digits"),
    cardHoldersName: Yup.string()
      .required("Required")
      .matches(/^[a-zA-Z ]{2,30}$/, "Must be 2-30 characters"),
    expirationYear: Yup.string()
      .required("Required")
      .matches(/^[0-9]{2}$/, "Must be 2 digits"),
    expirationMonth: Yup.string().required("Required"),
    cvv: Yup.string()
      .required("Required")
      .matches(/^[0-9]{3}$/, "Must be 3 digits"),
  });

  // const [activeId, setActiveId] = useState(false);
  // const [active2, setActive2] = useState(false);
  // const [active3, setActive3] = useState(false);
  // const [active4, setActive4] = useState(false);

  // const countrys = [
  //   "bangladesh",
  //   "Algeria",
  //   "Afghanistan",
  //   "Ghana",
  //   "Albania",
  //   "Bahrain",
  //   "Colombia",
  //   "Dominican Republic",
  // ];

  const handlePayment = async (values, { resetForm }) => {
    const rnd = Date.now();
    try {
      const { data: hashData } = await axios.post("/api/payment/generateHash", {
        oid: "4839",
        amount: "108",
        okUrl: "https://api.solastore.com.tr/api/Helpers/CCSuccess",
        failUrl: "https://api.solastore.com.tr/api/Helpers/CCFail",
        islemtipi: "Auth",
        taksit: "",
        rnd: `${rnd}`,
      });
      dispatch({
        type: SET_BUYER_DETAILS,
        payload: {
          oid: "4839",
          amount: "108",
          ...values,
          rnd,
          ...hashData.data,
        },
      });
      router.push("/checkout/pay");
      resetForm();
    } catch (err) {
      toast.error("Bir hata oluştu");
      console.log(err);
    }
  };

  return (
    <Layout sticky textCenter container footerBg>
      <main>
        <PageTitle active="Checkout" pageTitle="Checkout" />

        <Formik
          initialValues={checkoutInitialValues}
          validationSchema={checkoutSchema}
          onSubmit={handlePayment}>
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
                <Form>
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="checkbox-form">
                        <h3>Billing Details</h3>
                        <div className="row">
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="CardNum"
                                id="CardNum"
                                label="Card Number"
                                errors={errors.cardNumber}
                                values={values.cardNumber.replace(" ", "")}
                                handleChange={handleChange("cardNumber")}
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="CardHoldersName"
                                id="CardHoldersName"
                                label="Card Holder Name"
                                errors={errors.cardHoldersName}
                                values={values.cardHoldersName}
                                handleChange={handleChange("cardHoldersName")}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="ExpirationYear"
                                id="ExpirationYear"
                                label="Expiration Year"
                                errors={errors.expirationYear}
                                values={values.expirationYear}
                                handleChange={handleChange("expirationYear")}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="ExpirationMonth"
                                id="ExpirationMonth"
                                label="Expiration Month"
                                errors={errors.expirationMonth}
                                values={values.expirationMonth}
                                handleChange={handleChange("expirationMonth")}
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="checkout-form-list">
                              <InputGroup
                                name="CVV"
                                id="CVV"
                                label="CVV"
                                errors={errors.cvv}
                                values={values.cvv}
                                handleChange={handleChange("cvv")}
                              />
                            </div>
                          </div>
                          <div className="order-button-payment mt-20">
                            <button type="submit" className="bt-btn theme-btn">
                              Place order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </section>
          )}
        </Formik>
      </main>
    </Layout>
  );
};

export default connect(null, { setCheckoutData })(Checkout);
