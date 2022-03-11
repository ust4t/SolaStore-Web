import { useEffect, useState } from "react";
import Image from "next/image";
import Head from "next/head";
import { useSelector } from "react-redux";
import axios from "axios";
import { Formik } from "formik";
import toast from "react-hot-toast";

import Layout from "../src/layout/Layout";
import InputGroup from "../src/components/form/InputGroup";
import Preloader from "../src/layout/Preloader";
import ConfirmModal from "../src/components/Modals/ConfirmModal/ConfirmModal";
import Router from "next/router";
import useTranslation from "next-translate/useTranslation";
import sources from "../sources";

const Dashboard = () => {
  const { t } = useTranslation("register");
  const user = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    name: "",
    lastname: "",
    email: "",
    tel: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);

  const closeModal = (setSubmitting) => {
    setSubmitting(false);
    setModal(false);
  };

  const openModal = () => setModal(true);

  const getUserByID = async () => {
    const { data } = await axios.get("/api/auth/getUserByID", {
      params: {
        id: user.uid,
      },
    });
    setUserData({
      name: data.userName,
      lastname: data.userSurname,
      email: data.userEmail,
      tel: data.userPhone,
      password: data.userPassword,
    });
  };

  useEffect(() => {
    if (user.state === "guest") {
      Router.push("/");
      return;
    }
    getUserByID();
  }, [user, isLoading]);

  const handleUserUpdate = async (
    { name, lastname, email, password, tel },
    setSubmitting
  ) => {
    setIsLoading(true);
    try {
      await axios.post(
        "/api/auth/updateUser",
        {
          name,
          lastname,
          email,
          oldPassword: userData.password,
          password,
          tel,
        },
        null
      );

      setUserData({
        name,
        lastname,
        email,
        password,
        tel,
      });
      setModal(false);
      toast.success("Hesabınız başarıyla güncellendi.");
    } catch (error) {
      toast.error(`Bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  const dashboardInitials = {
    name: userData.name,
    lastname: userData.lastname,
    email: userData.email,
    tel: userData.tel,
    password: userData.password,
    bod: "",
  };

  return (
    <>
      <Head>
        <title>Sola Store | {t("footer:myprofile")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        {isLoading && <Preloader />}

        <main>
          <section className="login-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div
                  className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    gap: "15px",
                  }}>
                  <Image
                    src="/images/logo/person.jpg"
                    width="150"
                    height="150"
                    className="m-2 rounded-circle"
                  />
                  <h4 className="fs-5 fw-bold">{`${userData.name} ${userData.lastname}`}</h4>
                  <h5>{userData.email}</h5>
                  {/* <div className="d-flex">
                  <button className="btn grenbtn1 text-uppercase me-3">
                    Upload New Photo
                  </button>
                  <button className="btn grenbtn1 text-uppercase">
                    Remove
                  </button>
                </div>
                <p className="fs-6 text-secondary">
                  En Fazla 300kb Fotoğraf Yükleyebilirsiniz.
                </p> */}
                </div>
                <div className="col-12 col-md-6">
                  <h5 className="fs-4 fw-bold text-center text-md-start">
                    Üyelik Bilgileri
                  </h5>
                  <Formik
                    initialValues={dashboardInitials}
                    onSubmit={openModal}
                    enableReinitialize>
                    {({
                      values,
                      touched,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      setSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <ConfirmModal
                          title="Are You Sure?"
                          show={modal}
                          handleClose={() => closeModal(setSubmitting)}
                          handleConfirm={() =>
                            handleUserUpdate(values, setSubmitting)
                          }
                          handleCancel={() => closeModal(setSubmitting)}
                        />
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <InputGroup
                              containerClass="my-md-4"
                              formClassName="py-4"
                              labelClassName="mb-2"
                              label={t("username")}
                              id="name"
                              name="name"
                              type="string"
                              placeholder={t("username_placeholder")}
                              values={values.name}
                              errors={errors.name}
                              touched={touched.name}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                            <InputGroup
                              containerClass="my-md-4"
                              formClassName="py-4"
                              labelClassName="mb-2"
                              label={t("userlast")}
                              id="lastname"
                              name="lastname"
                              type="string"
                              placeholder={t("userlast_placeholder")}
                              values={values.lastname}
                              errors={errors.lastname}
                              touched={touched.lastname}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                            <InputGroup
                              containerClass="my-md-4"
                              formClassName="py-4"
                              labelClassName="mb-2"
                              label={t("common:emaillogin")}
                              id="email"
                              name="email"
                              type="email"
                              placeholder={t("common:email_placeholder")}
                              values={values.email}
                              errors={errors.email}
                              touched={touched.email}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <InputGroup
                              containerClass="my-md-4"
                              formClassName="py-4"
                              labelClassName="mb-2"
                              label={t("userphone")}
                              id="tel"
                              name="tel"
                              type="tel"
                              placeholder={t("register:userphone_placeholder")}
                              values={values.tel}
                              errors={errors.tel}
                              touched={touched.tel}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                            <InputGroup
                              containerClass="my-md-4"
                              formClassName="py-4"
                              labelClassName="mb-2"
                              label={t("common:passlogin")}
                              id="password"
                              name="password"
                              type="password"
                              placeholder={t("common:pass_placeholder")}
                              values={values.password}
                              errors={errors.password}
                              touched={touched.password}
                              handleBlur={handleBlur}
                              handleChange={handleChange}
                            />
                            {/* <InputGroup
                            containerClass="my-md-4"
                            formClassName="py-4"
                            labelClassName="mb-2"
                            label="Doğum Tarihi"
                            id="bod"
                            name="bod"
                            type="date"
                            placeholder="Doğum Tarihi giriniz..."
                            values={values.bod}
                            errors={errors.bod}
                            touched={touched.bod}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                          /> */}
                          </div>
                          <div className="col-12 d-flex justify-content-center">
                            <button
                              type="submit"
                              className="btn grenbtn1 text-uppercase"
                              disabled={isSubmitting}>
                              Hesabı Kaydet
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Dashboard;
