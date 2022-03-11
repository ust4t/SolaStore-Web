import axios from "axios";
import { Formik } from "formik";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useContext } from "react";
import * as Yup from "yup";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { CREATE_USER_ID } from "../src/redux/action/type";
import { StoreContext } from "../src/context/StoreProvider";

const Login = () => {
  const { t } = useTranslation("common");
  const { wishListActions } = useContext(StoreContext);
  const { push } = useRouter();
  const dispatch = useDispatch();

  const loginSchema = Yup.object().shape({
    email: Yup.string().email(t("invalidEmail")).required(t("required")),
    password: Yup.string().required(t("required")),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleLogin = async ({ email, password }, { setSubmitting }) => {
    try {
      const { data } = await axios.post("/api/auth/loginUser", null, {
        params: {
          email,
          password,
        },
      });

      dispatch({
        type: CREATE_USER_ID,
        payload: {
          uid: data.userID,
          rnd_id: data.rnd_id,
          state: "user_registered",
          name: `${data.userName} ${data.userSurname}`,
        },
      });
      toast.success("Başarılı bir şekilde giriş yaptınız.");
      wishListActions.wishlistRefetch();
      push("/");
    } catch (error) {
      console.log(error);
      toast.error("Bir hata oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Sola Store | {t("loginhere")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <main>
          <PageTitle active={t("loginhere")} pageTitle={t("loginhere")} />
          <section className="login-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 offset-lg-2">
                  <div className="basic-login">
                    <h3 className="text-center mb-60">{t("loginhere")}</h3>
                    <Formik
                      initialValues={initialValues}
                      validationSchema={loginSchema}
                      onSubmit={handleLogin}>
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
                            <div className="col-12">
                              <InputGroup
                                label={t("emaillogin")}
                                id="email"
                                name="email"
                                type="email"
                                placeholder={t("email_placeholder")}
                                values={values.email}
                                errors={errors.email}
                                touched={touched.email}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                            <div className="col-12">
                              <InputGroup
                                label={t("passlogin")}
                                id="password"
                                name="password"
                                type="password"
                                placeholder={t("pass_placeholder")}
                                values={values.password}
                                errors={errors.password}
                                touched={touched.password}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                              />
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bt-btn theme-btn-2 w-100">
                            {t("loginhere")}
                          </button>
                          <div className="or-divide">
                            <span>{t("or")}</span>
                          </div>
                          <Link href="/register">
                            <a className="bt-btn bt-btn-black w-100 text-center">
                              {t("signup")}
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

export default Login;
