import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
const Login = () => {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle active="Dashboard" pageTitle="Dashboard" />
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <h1>Dashboard</h1>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
