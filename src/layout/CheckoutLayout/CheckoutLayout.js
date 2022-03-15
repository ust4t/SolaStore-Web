import { Form } from "formik";
import React from "react";
import useTranslation from "next-translate/useTranslation";

import InputGroup from "../../components/form/InputGroup";
import {
  order_button_payment,
  checkout_form_list,
} from "./CheckoutLayout.module.css";

export default function CheckoutLayout({ errors, values, handleChange }) {
  const { t } = useTranslation("checkout");

  return (
    <section className="pb-70 mt-4">
      <div className="container">
        <Form>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <>
                <h3>{t("formTitle")}</h3>
                <div className="row">
                  <div className="col-md-12">
                    <div className={`${checkout_form_list}`}>
                      <InputGroup
                        name="CardNum"
                        id="CardNum"
                        label={t("cardNumber")}
                        errors={errors.cardNumber}
                        values={values.cardNumber.replace(" ", "")}
                        handleChange={handleChange("cardNumber")}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className={`${checkout_form_list}`}>
                      <InputGroup
                        name="CardHoldersName"
                        id="CardHoldersName"
                        label={t("cardHolder")}
                        errors={errors.cardHoldersName}
                        values={values.cardHoldersName}
                        handleChange={handleChange("cardHoldersName")}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`${checkout_form_list}`}>
                      <InputGroup
                        name="ExpirationYear"
                        id="ExpirationYear"
                        label={t("expiryDate")}
                        errors={errors.expirationYear}
                        values={values.expirationYear}
                        handleChange={handleChange("expirationYear")}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`${checkout_form_list}`}>
                      <InputGroup
                        name="ExpirationMonth"
                        id="ExpirationMonth"
                        label={t("expiryMonth")}
                        errors={errors.expirationMonth}
                        values={values.expirationMonth}
                        handleChange={handleChange("expirationMonth")}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className={`${checkout_form_list}`}>
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
                  <div className={`${order_button_payment} mt-20`}>
                    <button type="submit" className="bt-btn">
                      {t("checkoutBtn")}
                    </button>
                  </div>
                </div>
              </>
            </div>
          </div>
        </Form>
      </div>
    </section>
  );
}
