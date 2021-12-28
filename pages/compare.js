import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { getCompare, removeCompare } from "../src/redux/action/utilis";

const Compare = ({ getCompare, removeCompare }) => {
  useEffect(() => {
    getCompare();
  }, []);
  const compares = useSelector((state) => state.utilis.compares);
  const [addCart, setaddCart] = useState(false);

  return (
    <Layout sticky textCenter footerBg container>
      <main>
        <PageTitle active="Compare" pageTitle="Compare" />
        {compares && compares.length > 0 ? (
          <section className="cart-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="product-quantity">Stock</th>
                            <th className="product-subtotal">Unit Price</th>
                            <th className="product-remove">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {compares &&
                            compares.map((compare) => (
                              <tr key={compare.id}>
                                <td className="product-thumbnail">
                                  <a href="#">
                                    <img src={compare.img} alt="cart" />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    {compare.name}
                                  </a>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}
                                    className="text-capitalize text-primary"
                                  >
                                    {compare.stock
                                      ? "In Stock"
                                      : "Out of stock"}
                                  </a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(compare.mainPrice).toFixed(2)}
                                  </span>
                                </td>
                                <td className="product-remove">
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      removeCompare(compare);
                                      setaddCart(true);
                                      toast.error("Remove Item from Compare.");
                                      e.preventDefault();
                                    }}
                                  >
                                    <i className="fa fa-times" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <h2 className="pt-100 pb-50 text-center w-100">No Product Found</h2>
        )}
      </main>
    </Layout>
  );
};

export default connect(null, { getCompare, removeCompare })(Compare);
