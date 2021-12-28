import moment from "moment";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { getCarts } from "../src/redux/action/utilis";
import { totalPrice } from "../src/utils/utils";

const OrderSuccess = ({ getCarts }) => {
  useEffect(() => {
    getCarts();
  }, []);
  const carts = useSelector((state) => state.utilis.carts);
  const chcekoutData = useSelector((state) => state.utilis.chcekoutData);
  let date = new Date();
  date.setDate(date.getDate() + 7);

  let randomNumber = `${Math.floor(Math.random() * 100000)}VUE${Math.floor(
    Math.random() * 100000
  )}`;

  return (
    <Layout container footerBg textCenter sticky>
      <main>
        <PageTitle
          pageTitle="THANK YOU"
          thankupage
          active="order success"
          id={randomNumber}
        />
        <section className="cart-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* <h5>Order Details : </h5> */}
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Images</th>
                          <th className="cart-product-name">Product</th>
                          <th className="product-price">Unit Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {carts &&
                          carts.map((cart) => (
                            <tr key={cart.id}>
                              <td className="product-thumbnail">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  <img src={cart.img} alt="cart" />
                                </a>
                              </td>
                              <td className="product-name">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  {cart.name}
                                </a>
                              </td>
                              <td className="product-price">
                                <span className="amount">
                                  ${Number(cart.mainPrice).toFixed(2)}
                                </span>
                              </td>

                              <td className="product-price">
                                <span className="amount">
                                  {Number(cart.qty)}
                                </span>
                              </td>

                              <td className="product-subtotal">
                                <span className="amount">
                                  ${Number(cart.totalPrice).toFixed(2)}
                                </span>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-page-total">
                    <h2>Cart totals</h2>
                    <ul className="mb-20">
                      <li>
                        Subtotal <span>${totalPrice(carts)}</span>
                      </li>
                      <li>
                        Total <span>${totalPrice(carts)}</span>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
              <div className="col-lg-6 order-success">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Summery :</h5>
                    <p>
                      <b>Order ID:</b> {randomNumber}
                    </p>
                    <p>
                      <b>Order Date:</b> {moment().format("MMMM DD, YYYY")}
                    </p>
                    <p>
                      <b>Order Total:</b> ${totalPrice(carts)}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h5>Shipping Address</h5>
                    <p className="text-capitalize">
                      {chcekoutData
                        ? `${chcekoutData.fName} ${chcekoutData.lName}`
                        : "Sabuj Hasan Sarker"}
                    </p>
                    <p>
                      {chcekoutData
                        ? `${chcekoutData.address} ${chcekoutData.country}`
                        : "Jatrabari,Dhaka-1204 Bangladesh"}
                    </p>
                    <p>
                      Contact No.{" "}
                      {chcekoutData ? chcekoutData.phone : "987456321"}
                    </p>
                  </div>
                  <div className="col-12 mt-4">
                    <h5>Payment Method</h5>
                    <p>
                      Pay on Delivery (Cash/Card). Cash on delivery (COD)
                      available. Card/Net banking acceptance subject to device
                      availability.
                    </p>
                    <div className="bg-light p-3 mt-4 text-center">
                      <h5>Expected Date Of Delivery</h5>
                      {/* <h2>{moment().add(7, "days")}</h2> */}
                      <h2>{moment(date).format("MMMM DD, YYYY")}</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default connect(null, { getCarts })(OrderSuccess);
