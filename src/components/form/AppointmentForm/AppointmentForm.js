import axios from "axios";
import { Formik } from "formik";
import useTranslation from "next-translate/useTranslation";
import toast from "react-hot-toast";
import * as Yup from "yup";

import {
  appointmentForm,
  appointmentFormDateTime,
  appointmentFormMessage,
  appointWrapper,
  appointmentSubmit,
} from "./AppointmentForm.module.css";

const imagesDesktop = [
  "/images/all-bg/appointment.jpg",
  "/images/all-bg/appointment2.jpg",
];

const imagesMobile = [
  "/images/all-bg/mobile.jpg",
  "/images/all-bg/mobile2.jpg",
];

const randomizeImage = (images) =>
  images[Math.floor(Math.random() * images.length)];

export default function AppointmentForm() {
  const { t } = useTranslation("appointment");

  const initialValuesAppointment = {
    name: "",
    lastName: "",
    tel: "",
    date: "",
    message: "",
  };

  const appointSchema = Yup.object().shape({
    name: Yup.string().required(t("register:nameRequired")),
    lastName: Yup.string().required(t("phone:lastnameRequired")),
    tel: Yup.string()
      .min(5, t("appointmentPhone"))
      .required(t("phone:placeholder")),
    date: Yup.string().required(t("appointmentDate")),
    message: Yup.string().required(t("contact:message_required")),
  });

  const handleAppointmentSubmit = async (
    values,
    { resetForm, setSubmitting }
  ) => {
    try {
      await axios.post("/api/advertisement/addVideoCall", {
        salesRepresants: 0,
        meetingDateTime: values.date,
        customerName: values.name,
        customerSurname: values.lastName,
        customerPhoneNumber: values.tel,
      });
      toast.success(t("appointmentSuccess"), {
        position: "top-center",
      });
    } catch {
      toast.error(t("appointmentFailed"), {
        position: "top-center",
      });
    } finally {
      resetForm();
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`row align-items-center justify-content-center ${appointWrapper}`}>
      <Formik
        initialValues={initialValuesAppointment}
        validationSchema={appointSchema}
        onSubmit={handleAppointmentSubmit}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="row align-items-center justify-content-center">
              <h1 className="mb-3 fs-2 fw-bold text-center text-lg-start">
                {t("appointmentFormTitle")}
              </h1>

              <div className="col-12 col-lg-6 mb-1">
                <input
                  value={values.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  className={`${appointmentForm} ${
                    errors.name && touched.name && "border border-danger"
                  }`}
                  id="name"
                  name="name"
                  type="string"
                  placeholder={t("register:username_placeholder")}
                  required
                />
              </div>
              <div className="col-12 col-lg-6 mb-1">
                <input
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  className={`${appointmentForm} ${
                    errors.lastName &&
                    touched.lastName &&
                    "border border-danger"
                  }`}
                  id="lastName"
                  name="lastName"
                  type="string"
                  placeholder={t("register:userlast_placeholder")}
                  required
                />
              </div>
            </div>
            <div className="row align-items-center justify-content-center">
              <div className="col-12 col-lg-6 mb-1">
                <input
                  value={values.tel.replace(/\D/g, "")}
                  onChange={handleChange("tel")}
                  onBlur={handleBlur("tel")}
                  className={`${appointmentForm} ${
                    errors.tel && touched.tel && "border border-danger"
                  }`}
                  id="tel"
                  name="tel"
                  type="string"
                  placeholder={t("register:userphone_placeholder")}
                  required
                />
              </div>
              <div className="col-12 col-lg-6 mb-1">
                <input
                  value={values.date}
                  onChange={handleChange("date")}
                  onBlur={handleBlur("date")}
                  className={`${appointmentForm} ${
                    errors.date && touched.date && "border border-danger"
                  } fs-5 ${appointmentFormDateTime}`}
                  style={{
                    padding: ".9rem",
                  }}
                  id="date"
                  name="date"
                  type="datetime-local"
                  step={1}
                  required
                />
              </div>
              <div className="col-12 mb-1">
                <textarea
                  value={values.message}
                  onChange={handleChange("message")}
                  onBlur={handleBlur("message")}
                  className={`${appointmentFormMessage} ${
                    errors.message && touched.message && "border border-danger"
                  }`}
                  name="message"
                  placeholder={t("contact:form.message")}
                  required
                />
              </div>
              <div className="col-12">
                <button
                  onClick={handleSubmit}
                  className={`btn grenbtn1 ${appointmentSubmit}`}
                  disabled={isSubmitting}>
                  {t("contact:form.submit")}
                </button>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <div className="col-12 col-lg-4 order-1 order-lg-2">
        <img
          className="d-none d-lg-block"
          src={randomizeImage(imagesDesktop)}
          alt="solastore"
        />
        <img
          style={{
            objectFit: "cover",
          }}
          className="d-block d-lg-none w-100 mb-4"
          src={randomizeImage(imagesMobile)}
          alt="solastore"
        />
      </div>
    </div>
  );
}
