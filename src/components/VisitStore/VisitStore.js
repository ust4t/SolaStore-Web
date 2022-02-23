import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import React from "react";

import { container, buttonStore, visitTitle } from "./VisitStore.module.css";

export default function VisitStore() {
  const { t } = useTranslation("home");

  return (
    <div
      className={`row ${container} justify-content-center align-items-center`}>
      <div
        className="col-12 col-lg-4"
        style={{
          display: "grid",
          placeContent: "center",
        }}>
        <Image
          src="/images/car.gif"
          alt="Solastore visit our page"
          width={400}
          height={200}
        />
      </div>
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
        <h1 className={`text-center ${visitTitle} fw-bold`}>
          {t("visitTitle")}
        </h1>
        <button
          className={`btn ${buttonStore}`}
          style={{
            borderRadius: "10px",
          }}>
          {t("visitButton")}
        </button>
      </div>
    </div>
  );
}
