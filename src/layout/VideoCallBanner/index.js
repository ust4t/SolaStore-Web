import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import sources from "../../../sources";

import { bannerContainer, bannerBtn } from "./VideoCallBanner.module.css";

export default function VideoCallBanner() {
  const { t } = useTranslation("appointment");
  return (
    <div
      style={{
        background: `url("${sources.imageCDN}/fit-in/650x600/filters:format(webp)/images/all_bg/appointment.jpg") no-repeat center center / cover`,
      }}
      className={bannerContainer}>
      <h1
        style={{
          fontSize: "3rem",
        }}
        className="text-white text-center fw-bold mb-3">
        {t("appointmentFormTitle")}
      </h1>
      <h5
        style={{
          lineHeight: "1.5",
        }}
        className="text-white text-center fs-4">
        {t("appointmentFormSubtitle")}
      </h5>
      <Link href="/appointment">
        <button className={`btn grenbtn1 rounded text-capitalize ${bannerBtn}`}>
          {t("appointBtn")}
        </button>
      </Link>
    </div>
  );
}
