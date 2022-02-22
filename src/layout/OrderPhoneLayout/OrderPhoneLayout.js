import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";

import OrderFormPhone from "../../components/form/OrderFormPhone";
import {
  tableRow,
  tableHead,
  tableBody,
  emptyIndicator,
  detailButton,
} from "./OrderPhoneLayout.module.css";
import Loader from "../../components/Loader";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function OrderPhoneLayout() {
  const { t } = useTranslation("myorders");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ orderTel }, { resetForm }) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/payment/orderListWithPhone", {
        orderTel,
      });
      setOrders(data);
      resetForm();
    } catch (error) {
      toast.error(`Bir hata oluştu: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row m-4">
      <div className="col-12">
        <h2 className="text-center fw-bold">{t("title")}</h2>
      </div>
      <OrderFormPhone onSubmit={handleSubmit} />
      <div className="col-12 d-flex justify-content-center align-items-center my-2">
        {isLoading ? (
          <Loader />
        ) : !!orders.length ? (
          <table className={tableRow}>
            <thead className={tableHead}>
              <tr>
                <th>{t("date")}</th>
                <th>{t("order_owner")}</th>
                <th>{t("amount")}</th>
                <th>{t("representer")}</th>
                <th></th>
              </tr>
            </thead>

            <tbody className={tableBody}>
              {orders.map((order) => (
                <tr key={order.orderID}>
                  <td>{Date(order.addingDate).toLocaleString()}</td>
                  <td>{order.buyerName}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.salesRepresentID}</td>
                  <td>
                    <button className={`btn grenbtn1 ${detailButton}`}>
                      <Link href={`/orders/${order.orderID}`}>
                        <a>{t("detailButton")}</a>
                      </Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=" d-flex flex-column justify-content-center align-items-center">
            <i className={`fas fa-box-open ${emptyIndicator}`} />
            <h3 className="text-center">{t("order_not_found")}</h3>
          </div>
        )}
      </div>
    </div>
  );
}
