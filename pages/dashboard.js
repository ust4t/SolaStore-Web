import Layout from "../src/layout/Layout";
import Image from "next/image";

import { Formik } from "formik";
import InputGroup from "../src/components/form/InputGroup";
const Login = () => {
  const dashboardInitials = {
    name: "",
    lastname: "",
    email: "",
    tel: "",
    password: "",
    bod: "",
  };

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
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
                  src="/img/logo/person.jpg"
                  width="150"
                  height="150"
                  className="m-2 rounded-circle"
                />
                <h4 className="fs-5 fw-bold">Harry Pique</h4>
                <h5>hkn.unl@gmail.com</h5>
                <div className="d-flex">
                  <button className="btn grenbtn1 text-uppercase me-3">
                    Upload New Photo
                  </button>
                  <button className="btn grenbtn1 text-uppercase">
                    Remove
                  </button>
                </div>
                <p className="fs-6 text-secondary">
                  En Fazla 300kb Fotoğraf Yükleyebilirsiniz.
                </p>
              </div>
              <div className="col-12 col-md-6">
                <h5 className="fs-4 fw-bold text-center text-md-start">
                  Üyelik Bilgileri
                </h5>
                <Formik
                  initialValues={dashboardInitials}
                  // validationSchema={dashboardSchema}
                  // onSubmit={handleRegister}
                >
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
                      <div className="row g-3">
                        <div className="col-12 col-md-6">
                          <InputGroup
                            containerClass="my-md-4"
                            formClassName="py-4"
                            labelClassName="mb-2"
                            label="Üye Adı"
                            id="name"
                            name="name"
                            type="string"
                            placeholder="İsim giriniz..."
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
                            label="Üye Soyadı"
                            id="lastname"
                            name="lastname"
                            type="string"
                            placeholder="Soyisim giriniz..."
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
                            label="Email"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email giriniz..."
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
                            label="Telefon"
                            id="tel"
                            name="tel"
                            type="tel"
                            placeholder="Telefon giriniz..."
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
                            label="Şifre"
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Şifre giriniz..."
                            values={values.password}
                            errors={errors.password}
                            touched={touched.password}
                            handleBlur={handleBlur}
                            handleChange={handleChange}
                          />
                          <InputGroup
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
                          />
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                          <button
                            type="submit"
                            className="btn grenbtn1 text-uppercase">
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
  );
};

export default Login;
