import Layout from "../src/layout/Layout";
import Image from "next/image";

import PageTitle from "../src/layout/PageTitle";
const Login = () => {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        {/* <PageTitle active="Dashboard" pageTitle="Dashboard" /> */}
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div
                className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center"
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
              <div className="col-12 col-md-6">Dashboard</div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
