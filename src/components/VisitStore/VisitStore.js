import React from "react";
import { useLottie } from "lottie-react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";

import Car from "../../../public/lottie/car.json";
import { container, buttonStore, visitTitle } from "./VisitStore.module.css";

export default function VisitStore() {
  const { t } = useTranslation("home");
  const options = {
    animationData: Car,
    loop: true,
    autoplay: true,
    style: {
      width: "350px",
      height: "350px",
      margin: "-70px",
    },
  };

  const { View } = useLottie(options);

  return (
    <div
      className={`d-block d-md-none row ${container} justify-content-center align-items-center`}>
      <div
        className="col-12 col-lg-4"
        style={{
          display: "grid",
          placeContent: "center",
        }}>
        {View}
      </div>
      <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center">
        <h1 className={`text-center ${visitTitle} fw-bold`}>
          {t("visitTitle")}
        </h1>
        <Link href="/redirect/redirect-map">
          <button
            className={`btn ${buttonStore}`}
            style={{
              borderRadius: "10px",
            }}>
            {t("visitButton")}
          </button>
        </Link>
      </div>
    </div>
  );
}
