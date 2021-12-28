import { Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import InputGroup from "../src/components/form/InputGroup";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { loginSchema } from "../src/utils/yupModal";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Layout sticky textCenter footerBg container>
      <main>
      <link rel="stylesheet" href="css/passopen.css" />
        <PageTitle active="Login" pageTitle="Login" />
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Login From Here</h3>
                  <Formik
                    initialValues={loginSchema.initialValue}
                    validationSchema={loginSchema.schema}
                    onSubmit={(values, { setSubmitting }) => {
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                      }, 400);
                    }}
                  >
                    {({
                      values,
                      errors,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <InputGroup
                          label="Email Address"
                          id="email"
                          name="email"
                          type="string"
                          placeholder="Enter Username or Email address..."
                          values={values.email}
                          errors={errors.email}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                   <div className="row">
                     <div className="col-lg-10 col-9">
                        <InputGroup
                          label="Password"
                          id="password"
                          name="password"
                          type="password"
                          placeholder="Enter password..."
                          values={values.password}
                          errors={errors.password}
                          handleBlur={handleBlur}
                          handleChange={handleChange}
                        />
                       </div> 
                       <div className="col-lg-2 col-3">
                            <svg className="close" viewBox="0 0 100 100">
                                <path id="top-eye-part" d="M10,50 Q50,-10 90,50" fill="none" strokeWidth={5} />
                                <path id="bottom-eye-part" d="M10,50 Q50,110 90,50" fill="none" strokeWidth={5} />
                                <circle cx={50} cy={50} r={10} fill="black" />
                              </svg>
                       </div>
                      </div> 
                        <div className="login-action mb-20 fix">
                          <span className="log-rem f-left">
                            <input id="remember" type="checkbox" />
                            <label htmlFor="remember">Remember me!</label>
                          </span>
                          <span className="forgot-login f-right">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Lost your password?
                            </a>
                          </span>
                        </div>

                        <button
                          disabled={isSubmitting}
                          className="bt-btn theme-btn-2 w-100"
                        >
                          Login Now
                        </button>
                        <div className="or-divide">
                          <span>or</span>
                        </div>
                        <Link href="/register">
                          <a className="bt-btn bt-btn-black w-100 text-center">
                            Register Now
                          </a>
                        </Link>
                        <Link href="/register">
                          <a className="bt-btn bt-btn-black w-100 text-center mt-30">
                            Şifremi Unuttum
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
      <script src="js/passopen.js"></script>   
    </Layout>
  );
};

export default Login;
