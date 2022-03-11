import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Router from "next/router";

import { encodeURLString } from "../../utils/utils";

import { orderButton, emptyIndicator } from "./OrderDetailLayout.module.css";

export default function OrderDetail({ orderData }) {
  const { t } = useTranslation("myorders");

  return (
    <div className="px-2 px-md-4 my-3 container">
      <div className="row">
        <h2 className="text-center fw-bold">{t("titleDetails")}</h2>
      </div>
      <div
        className="row justify-content-center align-items-center rounded"
        style={{
          background: "rgba(0,0,0,0.1)",
        }}>
        <div className="col-2">
          <p className="fs-6 my-1 fw-bold">{t("picture")}</p>
        </div>
        <div className="col-4">
          <p className="fs-6 my-1 fw-bold">{t("product")}</p>
        </div>
        <div className="col-3">
          <p className="fs-6 my-1 fw-bold">{t("number")}</p>
        </div>
        <div className="col-3">
          <p className="fs-6 my-1 fw-bold">{t("price")}</p>
        </div>
      </div>

      {orderData && orderData.length > 0 ? (
        orderData.map((item, i) => (
          <div
            key={`${i}_?.`}
            onClick={() =>
              Router.push(
                `/detail/${encodeURLString(item.productName)}:${item.productID}`
              )
            }
            className={`row justify-content-center align-items-center ${orderButton}`}>
            <div className="col-2">
              <Image
                className="rounded-circle"
                src="/images/placeholder.jpg"
                width={95}
                height={100}
                alt={"Solastore"}
              />
            </div>
            <div className="col-4">
              <p className="fs-6 fw-bold">{item.productName}</p>
            </div>
            <div className="col-3">
              <p className="fs-6 fw-bold">{item.quantity}</p>
            </div>
            <div className="col-3">
              <p className="fs-6 fw-bold">{item.price} USD</p>
            </div>
          </div>
        ))
      ) : (
        <div className="row">
          <div className="col-12">
            <i className={`fas fa-box-open ${emptyIndicator}`} />
            <h3 className="text-center">{t("order_not_found")}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
