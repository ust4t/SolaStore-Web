import useTranslation from "next-translate/useTranslation";

import {
  aboutImg,
  div_transparent,
  div_dot,
  divider,
} from "./AboutLayout.module.css";

export default function AboutLayout() {
  const { t } = useTranslation("statics");
  return (
    <>
      <div className="row mt-5 justify-content-center align-items-center">
        <div className="col-12 col-lg-3 me-md-5 me-md-3 d-flex align-items-center justify-content-center">
          <img
            src="/images/all-bg/about1.jpg"
            alt="about-image"
            className={`${aboutImg} me-lg-4`}
          />
        </div>
        <p className="fs-5 col-12 col-lg-5 justify-content-center align-items-center text-center text-lg-start px-3 px-sm-5 px-lg-0 mt-3 mb-0">
          {t("aboutParagraph1")}
        </p>
      </div>
      <div class={`${divider} ${div_transparent} ${div_dot}`} />
      <div className="row my-5 justify-content-center align-items-center">
        <div className="col-12 col-lg-3 ms-md-5 ms-md-3 d-flex align-items-center justify-content-center order-1 order-lg-2">
          <img
            src="/images/all-bg/about2.jpg"
            alt="about-image"
            className={`${aboutImg} ms-lg-4`}
          />
        </div>
        <p className="fs-5 col-12 col-lg-5 justify-content-center align-items-center text-center text-lg-start px-3 px-sm-5 px-lg-0 mt-3 mb-0 order-2 order-lg-1">
          {t("aboutParagraph2")}
        </p>
      </div>
      <div class={`${divider} ${div_transparent} ${div_dot}`} />
      <div className="row my-5 justify-content-center align-items-center">
        <div className="col-12 col-lg-3 me-md-5 me-md-3 d-flex align-items-center justify-content-center">
          <img
            src="/images/all-bg/about3.jpg"
            alt="about-image"
            className={`${aboutImg} me-lg-4`}
          />
        </div>
        <p className="fs-5 col-12 col-lg-5 justify-content-center align-items-center text-center text-lg-start px-3 px-sm-5 px-lg-0 mt-3 mb-0">
          {t("aboutParagraph3")}
        </p>
      </div>
    </>
  );
}
