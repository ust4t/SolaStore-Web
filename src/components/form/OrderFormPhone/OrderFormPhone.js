import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

import {
  orderFormInput,
  orderFormLabel,
  orderFormButton,
} from "./OrderFormPhone.module.css";

export default function OrderFormPhone({ onSubmit }) {
  const orderInitials = {
    orderTel: "",
  };

  const orderSchema = Yup.object().shape({
    orderTel: Yup.string().required("Telefon Numarası Gerekli"),
  });

  return (
    <div className="col-12 d-flex justify-content-center ">
      <Formik
        initialValues={orderInitials}
        validationSchema={orderSchema}
        onSubmit={onSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form onSubmit={handleSubmit} className="d-flex">
            <div className="d-flex flex-column justify-content-center">
              <label className={orderFormLabel} htmlFor="orderTel">
                Telefon Numarası <span className="text-danger">*</span>
              </label>

              <input
                value={values.orderTel}
                onChange={handleChange("orderTel")}
                onBlur={handleBlur("orderTel")}
                className={`${orderFormInput} ${
                  errors.orderTel && touched.orderTel && "border border-danger"
                }`}
                id="orderTel"
                name="orderTel"
                type="tel"
                placeholder="Telefon No. giriniz..."
                required
              />
            </div>
            <input
              type="submit"
              className={`btn grenbtn1 ${orderFormButton} text-uppercase`}
              value="Gönder"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
