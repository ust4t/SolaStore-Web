import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  contact_wrap,
  contact_form,
  sub_title,
  title,
} from "./ContactForm.module.css";

export default function ContactForm() {
  const { t } = useTranslation("contact");

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
        <span className={sub_title}>{t("form.subtitle")}</span>
        <h2 className={title}>{t("form.title")}</h2>
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
                  id="name"
                  name="name"
                  type="string"
                  placeholder={t("form.name")}
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("form.email")}
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  id="phone"
                  name="phone"
                  type="string"
                  placeholder={t("form.phone")}
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <input
                  id="subject"
                  name="subject"
                  type="string"
                  placeholder={t("form.subject")}
                  value={values.subject}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>
            <textarea name="message" placeholder={t("form.message")} />
            <button className="btn grenbtn1 text-uppercase">
              {t("form.submit")}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
