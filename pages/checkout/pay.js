import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import Preloader from "../../src/layout/Preloader";
import { StoreContext } from "../../src/context/StoreProvider";

export default function Test() {
  const { state } = useContext(StoreContext);
  const [paymentBox, setPaymentBox] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPay = async () => {
    const {
      hash,
      amount,
      oid,
      rnd,
      cardNumber,
      expirationMonth,
      expirationYear,
      cvv,
    } = state.buyerDetails;
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
      const cleanHtml = DOMPurify.sanitize(data.data, {
        ADD_TAGS: ["link", "style"],
      });
      setPaymentBox(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPay();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}>
      {isLoading && <Preloader />}

      {paymentBox && (
        <iframe
          srcDoc={paymentBox}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      )}
    </div>
  );
}
