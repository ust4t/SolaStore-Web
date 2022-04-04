import axios from "axios";
import Script from "next/script";
import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";

import sources from "../sources";
import { StoreContext } from "../src/context/StoreProvider";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";

const OrderSuccess = ({ orderList }) => {
  const { t } = useTranslation("order");
  const { state } = useContext(StoreContext);
  const { completedCartData } = state;

  const subTotal = completedCartData.carts.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0
  );

  return (
    <>
      <Head>
        <title>Sola Store | {t("ordersuccess")}</title>
        <script type="text/javascript">
          {`gtag('event', 'conversion', {
      'send_to': 'AW-359547484/9PdGCMzym64DENyEuasB',
      'value': ${subTotal},
      'currency': 'USD',
      'transaction_id': ''
          });`}
        </script>

        <script type="text/javascript">
          {`(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ 
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) 
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-73451034-1', 'solastore.com.tr'); 
                ga('require', 'ecommerce', 'ecommerce.js');

                ga('ecommerce:addTransaction', {
                'id': '${orderList[0].orderID}',
                'affiliation': 'Sola Store', 
                'revenue': '${subTotal}', 
                'shipping': '', 
                'tax': '',  
                });
                ${completedCartData.carts
                  .map((cart) => {
                    return `ga('ecommerce:addItem', { 
                    'id': '${orderList[0].orderID}',
                    'name':  '${cart.productShortName}', 
                    'sku': '${cart.productShortName.slice(
                      cart.productShortName.indexOf("-") + 1,
                      cart.productShortName.length
                    )}',
                    'category': '',       
                    'price': '${Number(cart.price).toFixed(2)}', 
                    'quantity':'${Number(cart.quantity)}'
                    });
                  `;
                  })
                  .join("")}
                ga('ecommerce:send');
`}
        </script>
        {/* 
         ${
                  gtag
                  .map((cart) => {
                    return `ga('ecommerce:addItem', {
                    'id': '${orderList[0].orderID}',
                    'name':  '${cart.productShortName}',
                    'sku': '${cart.productShortName.slice(
                      cart.productShortName.indexOf("-") + 1,
                      cart.productShortName.length
                    )}',
                    'category': ${cart.category},
                    'price': '${Number(cart.price).toFixed(2)}',
                    'quantity':'${Number(cart.quantity)}'
                    });`;
                  })
                  .join("")
                }
         ${completedCartData.carts
                  .map((cart) => {
                    return `ga('ecommerce:addItem', { 
                    'id': '${orderList[0].orderID}',
                    'name':  '${cart.productShortName}', 
                    'sku': '${cart.productShortName.slice(
                      cart.productShortName.indexOf("-") + 1,
                      cart.productShortName.length
                    )}',
                    'category': '',       
                    'price': '${Number(cart.price).toFixed(2)}', 
                    'quantity':'${Number(cart.quantity)}'
                    });
                  `;
                  })
                  .join("")} */}
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <main>
          <PageTitle
            pageTitle={t("orderthanks")}
            thankupage
            thankupageTitle={t("paymentsuccess")}
            id={!!orderList.length ? orderList[0].orderID : 0}
          />
          <section className="cart-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">
                              {t("orderimage")}
                            </th>
                            <th className="cart-product-name">
                              {t("orderpname")}
                            </th>
                            <th className="product-price">
                              {t("orderuniteprice")}
                            </th>
                            <th className="product-quantity">
                              {t("orderqua")}
                            </th>
                            <th className="product-subtotal">
                              {t("ordertot")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedCartData.carts &&
                            completedCartData.carts.map((cart) => (
                              <tr key={cart.chartID}>
                                <td className="product-thumbnail">
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}>
                                    <img
                                      src={`${sources.imageMinSrc}${cart.pictureOneGuidName}`}
                                      alt="cart"
                                    />
                                  </a>
                                </td>
                                <td className="product-name">
                                  <a
                                    href="#"
                                    onClick={(e) => e.preventDefault()}>
                                    {cart.productShortName}
                                  </a>
                                </td>
                                <td className="product-price">
                                  <span className="amount">
                                    ${Number(cart.price).toFixed(2)}
                                  </span>
                                </td>

                                <td className="product-price">
                                  <span className="amount">
                                    {Number(cart.quantity)}
                                  </span>
                                </td>

                                <td className="product-subtotal">
                                  <span className="amount">
                                    $
                                    {Number(cart.price) * Number(cart.quantity)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="cart-page-total">
                      <h2>{t("ordertot")}</h2>
                      <ul className="mb-20">
                        <li>
                          {t("ordertot")}{" "}
                          <span>${orderList[0].totalAmount}</span>
                        </li>
                      </ul>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6 order-success">
                  <div className="row">
                    <div className="col-md-6">
                      <h5>Summary :</h5>
                      <p>
                        <b>{t("orderid")}</b> {orderList[0].orderID}
                      </p>
                      <p>
                        <b>{t("orderdate")}</b>{" "}
                        {new Date(orderList[0].addingDate).toLocaleDateString()}
                      </p>
                      <p>
                        <b>{t("ordertotal")}</b> ${orderList[0].totalAmount}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h5>Shipping Address</h5>
                      <p className="text-capitalize">
                        <b>{t("ordername")}</b> {completedCartData.buyerName}
                      </p>
                      <p>
                        <b>{t("ordercontact")}</b>{" "}
                        {completedCartData.buyerPhone}
                      </p>
                    </div>
                    <div className="col-12 mt-4">
                      <h5>
                        <b>{t("paymentmethod")}</b>
                        {completedCartData.paymentType === "Order"
                          ? t("ordercurrent")
                          : t("ordercart")}
                      </h5>
                    </div>
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

export default OrderSuccess;

export async function getServerSideProps({ query }) {
  const { orderID, user } = query;
  const { data: orderList } = await axios.get(
    `https://api.solastore.com.tr/api/Order/OrderList?UserID=${user}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      orderList: orderList.filter((order) => order.orderID === Number(orderID)),
      buyer: {
        orderID,
      },
    },
  };
}
