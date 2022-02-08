import Image from "next/image";
import Router from "next/router";
import React from "react";

import { orderButton, emptyIndicator } from "./OrderDetailLayout.module.css";

export default function OrderDetail({ orderData }) {
  return (
    <div className="px-2 px-md-4 my-3 container">
      <div className="row">
        <h2 className="text-center fw-bold">Sipariş Detayları</h2>
      </div>
      <div
        className="row justify-content-center align-items-center rounded"
        style={{
          background: "rgba(0,0,0,0.1)",
        }}>
        <div className="col-2">
          <p className="fs-6 my-1 fw-bold">Resim</p>
        </div>
        <div className="col-4">
          <p className="fs-6 my-1 fw-bold">Ürün</p>
        </div>
        <div className="col-3">
          <p className="fs-6 my-1 fw-bold">Adet</p>
        </div>
        <div className="col-3">
          <p className="fs-6 my-1 fw-bold">Fiyat</p>
        </div>
      </div>

      {orderData && orderData.length > 0 ? (
        orderData.map((item, i) => (
          <div
            key={`${i}_?.`}
            onClick={() => Router.push(`/detail/${item.productID}`)}
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
            <h3 className="text-center">Sipariş Bulunamadı</h3>
          </div>
        </div>
      )}
    </div>
  );
}
