import { useContext } from "react";
import { Formik } from "formik";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { CREATE_USER_ID } from "../src/redux/action/type";
import { StoreContext } from "../src/context/StoreProvider";

const Register = () => {
  const { t } = useTranslation("register");
  const { wishListActions } = useContext(StoreContext);
  const dispatch = useDispatch();
  const { push } = useRouter();

  const name = Yup.string()
      .min(2, t("nameRequiredMax"))
      .max(30, t("nameRequiredMin"))
      .required(t("nameRequired")),
    lastname = Yup.string()
      .min(2, t("lastnameRequiredMin"))
      .max(30, t("lastnameRequiredMax"))
      .required(t("lastnameRequired")),
    tel = Yup.string().required(t("phoneRequired")),
    password = Yup.string()
      .min(5, t("passRequiredMin"))
      .max(50, t("passRequiredMax"))
      .required(t("passRequired")),
    confirmPassword = Yup.string()
      .oneOf([Yup.ref("password"), null], t("confirmmisMatch"))
      .required(t("confirm")),
    email = Yup.string().email().required(t("emailRequired"));

  const registerSchema = {
    schema: Yup.object().shape({
      name,
      lastname,
      tel,
      password,
      confirmPassword,
      email,
    }),
    initialValue: {
      name: "",
      lastname: "",
      tel: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  const handleRegister = async (
    { name, lastname, tel, password, email },
    { setSubmitting }
  ) => {
    try {
      const { data } = await axios.post("/api/auth/createUser", null, {
        params: {
          name,
          lastname,
          tel,
          email,
          password,
        },
      });
      dispatch({
        type: CREATE_USER_ID,
        payload: {
          uid: data.id,
          rnd_id: data.rnd_id,
          state: "user_registered",
          name: `${name} ${lastname}`,
        },
      });
      toast.success(
        "Ba??ar??l?? bir ??ekilde kay??t oldunuz. Giri?? yapabilirsiniz."
      );
      wishListActions.wishlistRefetch();
      push("/");
    } catch (error) {
      console.log(error);
      toast.error("Bir hata olu??tu. L??tfen tekrar deneyiniz.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sola Store | {t("common:signup")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <main>
          <PageTitle
            active={t("common:signup")}
            pageTitle={t("common:signup")}
          />
          <section className="login-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="basic-login">
                    <h3 className="text-center mb-60">{t("signhere")}</h3>
                    <Formik
                      initialValues={registerSchema.initialValue}
                      validationSchema={registerSchema.schema}
                      onSubmit={handleRegister}>
                      {({
                        values,
                        touched,
                        errors,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                      }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <InputGroup
                                label={t("username")}
                                id="name"
                                name="name"
                                type="string"
                                placeholder={t("username_placeholder")}
                                values={values.name}
                                touched={touched.name}
                                errors={errors.name}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <InputGroup
                                label={t("userlast")}
                                id="lastname"
                                name="lastname"
                                type="string"
                                placeholder={t("userlast_placeholder")}
                                values={values.lastname}
                                touched={touched.lastname}
                                errors={errors.lastname}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-6">
                              <InputGroup
                                label={t("common:emaillogin")}
                                id="email"
                                name="email"
                                type="string"
                                placeholder={t("common:email_placeholder")}
                                values={values.email}
                                touched={touched.email}
                                errors={errors.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-6">
                              <InputGroup
                                label={t("userphone")}
                                id="tel"
                                name="tel"
                                type="tel"
                                placeholder={t("userphone_placeholder")}
                                values={values.tel}
                                touched={touched.tel}
                                errors={errors.tel}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-12">
                              <InputGroup
                                label={t("common:passlogin")}
                                id="password"
                                name="password"
                                type="password"
                                placeholder={t("common:pass_placeholder")}
                                values={values.password}
                                touched={touched.password}
                                errors={errors.password}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-12">
                              <InputGroup
                                label={t("confirm")}
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder={t("confirm_placeholder")}
                                values={values.confirmPassword}
                                touched={touched.confirmPassword}
                                errors={errors.confirmPassword}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>

                          <button
                            disabled={isSubmitting}
                            className="bt-btn theme-btn-2 w-100">
                            {t("common:signup")}
                          </button>
                          <div className="or-divide">
                            <span>{t("common:or")}</span>
                          </div>
                          <Link href="/login">
                            <a className="bt-btn bt-btn-black w-100 text-center">
                              {t("common:loginhere")}
                            </a>
                          </Link>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Register;
