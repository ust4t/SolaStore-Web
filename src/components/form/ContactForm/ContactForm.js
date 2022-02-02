import { Formik } from "formik";
import React from "react";
import InputGroup from "../InputGroup";

import {
  contact_wrap,
  contact_form,
  sub_title,
  title,
} from "./ContactForm.module.css";

export default function ContactForm() {
  const contactInitialValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  return (
    <div className={contact_wrap}>
      <div className="mb-2">
        <span className={sub_title}>Bizimle İletişime Geçebilirsiniz</span>
        <h2 className={title}>İletişim Formu</h2>
      </div>
      <Formik initialValues={contactInitialValues}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className={contact_form}>
            <div className="row">
              <div className="col-md-6">
                <input
                  label="Adınız"
                  id="name"
                  name="name"
                  type="string"
                  placeholder="İsminizi giriniz..."
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email giriniz..."
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  label="Telefon"
                  id="phone"
                  name="phone"
                  type="string"
                  placeholder="Telefon giriniz..."
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  label="Konu"
                  id="subject"
                  name="subject"
                  type="string"
                  placeholder="Konu giriniz..."
                  value={values.subject}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea name="message" placeholder="Your Message" />
            <button className="btn grenbtn1 text-uppercase">Gönder</button>
          </form>
        )}
      </Formik>
    </div>
  );
}
