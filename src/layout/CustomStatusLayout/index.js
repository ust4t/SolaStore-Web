import useTranslation from "next-translate/useTranslation";

import Layout from "../Layout";
import {
  container,
  imgStatus,
  textContainer,
  title,
  imgContainer,
} from "./CustomStatusLayout.module.css";

export default function CustomStatusLayout({ img, statusCode, statusTitle }) {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <div className={container}>
        <div className={imgContainer}>
          <img src={img} className={imgStatus} />
          <div className={textContainer}>
            <h1 className={`text-center fw-bold text-white ${title}`}>
              {statusCode}
            </h1>
            <h2 className="text-center fw-bold fs-2 text-white">
              {statusTitle}
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
