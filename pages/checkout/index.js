import { Formik } from "formik";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";

import Layout from "../../src/layout/Layout";
import PageTitle from "../../src/layout/PageTitle";
import { StoreContext } from "../../src/context/StoreProvider";
import PayModal from "../../src/components/Modals/PayModal/PayModal";
import CheckoutLayout from "../../src/layout/CheckoutLayout";
import { useSelector } from "react-redux";

const Checkout = () => {
  const { t } = useTranslation("common");
  const lang = useSelector((state) => state.lang.lang);
  const [payModal, setPayModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentBox, setPaymentBox] = useState(null);
  const { state } = useContext(StoreContext);
  const { orderID, amount } = state.completedCartData;

  const checkoutInitialValues = {
    cardNumber: "",
    cardHoldersName: "",
    expirationYear: "",
    expirationMonth: "",
    cvv: "",
  };

  const checkoutSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required(t("required"))
      .matches(
        /^[0-9]{16}$/,
        t("digitWarn", {
          num: 16,
        })
      ),
    cardHoldersName: Yup.string()
      .required(t("required"))
      .matches(
        /^[a-zA-Z ]{2,30}$/,
        t("charWarn", {
          charNum: "2-30",
        })
      ),
    expirationYear: Yup.string()
      .required(t("required"))
      .matches(
        /^[0-9]{2}$/,
        t("digitWarn", {
          num: 2,
        })
      ),
    expirationMonth: Yup.string().required(t("required")),
    cvv: Yup.string()
      .required(t("required"))
      .matches(
        /^[0-9]{3}$/,
        t("digitWarn", {
          num: 3,
        })
      ),
  });

  const handlePayment = async (values, { resetForm }) => {
    const rnd = Date.now();
    try {
      const { data: hashData } = await axios.post("/api/payment/generateHash", {
        oid: `${orderID}`,
        amount: `${amount}`,
        okUrl: "https://api.solastore.com.tr/api/Helpers/CCSuccess",
        failUrl: "https://api.solastore.com.tr/api/Helpers/CCFail",
        islemtipi: "Auth",
        taksit: "",
        rnd: `${rnd}`,
        lang,
      });
      await fetchPay({
        oid: orderID,
        amount,
        ...values,
        rnd,
        ...hashData.data,
      });
      setPayModal(true);
      resetForm();
    } catch (err) {
      toast.error(t("error"));
      console.log(err);
    }
  };

  const fetchPay = async (buyerValues) => {
    const {
      hash,
      amount,
      oid,
      rnd,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    } = buyerValues;

    setIsLoading(true);

    try {
      const { data } = await axios.post("/api/payment/orderPay", {
        oid,
        amount,
        hash,
        rnd,
        pan: cardNumber,
        Ecom_Payment_Card_ExpDate_Year: expirationYear,
        Ecom_Payment_Card_ExpDate_Month: expirationMonth,
        cv2: cvv,
      });
      // const cleanHtml = DOMPurify.sanitize(data.data, {
      //   ADD_TAGS: ["link", "style"],
      // });
      setPaymentBox(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error(t("error"));
    }
  };

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle
          active={t("checkout:title")}
          pageTitle={t("checkout:title")}
        />
        <PayModal
          show={payModal}
          handleClose={() => setPayModal(false)}
          isLoading={isLoading}
          paymentBox={paymentBox}
        />
        <Formik
          initialValues={checkoutInitialValues}
          validationSchema={checkoutSchema}
          onSubmit={handlePayment}>
          {({ values, errors, handleChange }) => (
            <CheckoutLayout
              errors={errors}
              values={values}
              handleChange={handleChange}
            />
          )}
        </Formik>
      </main>
    </Layout>
  );
};

export default Checkout;
