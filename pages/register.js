import { useContext } from "react";
import { Formik } from "formik";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { CREATE_USER_ID } from "../src/redux/action/type";
import { registerSchema } from "../src/utils/yupModal";
import { StoreContext } from "../src/context/StoreProvider";
import useTranslation from "next-translate/useTranslation";

const Register = () => {
  const { t } = useTranslation("register");
  const { wishListActions } = useContext(StoreContext);
  const dispatch = useDispatch();
  const { push } = useRouter();

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
        "Başarılı bir şekilde kayıt oldunuz. Giriş yapabilirsiniz."
      );
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
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle active={t("common:signup")} pageTitle={t("common:signup")} />
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Signup From Here</h3>
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
                              placeholder="Email Adresini Giriniz..."
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
                              placeholder="Şifre giriniz..."
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
  );
};

export default Register;
