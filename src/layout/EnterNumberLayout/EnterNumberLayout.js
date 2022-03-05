import React from "react";
import {
  subTitle,
  numberInput,
  inputBtn,
} from "./EnterNumberLayout.module.css";
import useTranslation from "next-translate/useTranslation";
import axios from "axios";
import toast from "react-hot-toast";

export default function EnterNumberLayout() {
  const { t } = useTranslation("phone");
  const [number, setNumber] = React.useState("");

  const sendNumber = async (e) => {
    e.preventDefault();
    if (number === "") {
      toast.error("нельзя оставлять номер пустым");
      return;
    }
    try {
      await axios.post("/api/sendNumber", null, {
        params: {
          phone: number,
          title: "Numaranızı Bırakın(Website)",
        },
      });
      setNumber("");
      toast.success(t("success"));
    } catch (error) {
      toast.error(t("fail"));
    }
  };

  return (
    <div className="row p-lg-5 mx-lg-5">
      <div
        style={{
          backgroundImage:
            'url("https://d2tt2d87osw7ul.cloudfront.net/fit-in/800x600/images/all_bg/newsletter_bg.jpg")',
        }}
        className="col-lg-6 p-4 py-5 d-flex flex-column justify-content-between align-items-center">
        <h3 className="text-white fw-bold text-center text-uppercase">
          {t("title")}
        </h3>
        <div className={subTitle}>
          <h5 className="text-white m-0 text-uppercase">{t("subtitle")}</h5>
        </div>
        <div className="position-relative">
          <form onSubmit={sendNumber}>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={numberInput}
              type="number"
              placeholder={t("placeholder")}
            />
            <button type="submit" className={`${inputBtn} text-capitalize`}>
              {t("button")} <i className="fas fa-arrow-circle-right" />
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-6 my-4 my-lg-0 d-flex flex-column align-items-center">
        <i className="fas fa-user fa-5x mb-4" />
        <h4 className="fs-4 text-center mx-3">{t("info")}</h4>
        <a className="fs-6" href="tel:+9002124584500">
          {t("footer:tel")}: +90 (0212) 458 45 00
        </a>
        <a className="fs-6" href="tel:+9005554000005">
          {t("footer:tel")} 2: +90 (0555) 400 00 05
        </a>
        <a className="fs-6" href="tel:+9005554000011">
          {t("footer:tel")} 3: +90 (0555) 400 00 11
        </a>
        <a className="fs-6" href="mailto:info@solastore.com.tr">
          Email: info@solastore.com.tr
        </a>
      </div>
    </div>
  );
}
