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
  const { t } = useTranslation("footer");
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
          title: "Numaranızı Bırakın",
        },
      });
      setNumber("");
      toast.success("успешно отправил ваш номер");
    } catch (error) {
      toast.error("не удалось отправить ваш номер");
    }
  };

  return (
    <div className="row p-lg-5 mx-lg-5">
      <div
        style={{
          backgroundImage: 'url("/images/all-bg/newsletter_bg.jpg")',
        }}
        className="col-lg-6 p-4 py-5 d-flex flex-column justify-content-between align-items-center">
        <h3 className="text-white fw-bold">НО ВАШ НОМЕР. МЫ ЖДЕМ ВАС!</h3>
        <div className={subTitle}>
          <h5 className="text-white m-0">ВЫ ХОТИТЕ ВИДЕТЬ СЕБЯ?</h5>
        </div>
        <div className="position-relative">
          <form onSubmit={sendNumber}>
            <input
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className={numberInput}
              type="number"
              placeholder="Напишите ваш номер..."
            />
            <button type="submit" className={inputBtn}>
              Отправить <i className="fas fa-arrow-circle-right" />
            </button>
          </form>
        </div>
      </div>
      <div className="col-lg-6 my-4 my-lg-0 d-flex flex-column align-items-center">
        <i className="fas fa-user fa-5x mb-4" />
        <h4 className="fs-4 text-center mx-3">
          После того, как вы оставите свой номер, наши представители по работе с
          клиентами свяжутся с вами как можно скорее.
        </h4>
        <a className="fs-6" href="tel:+9002124584500">
          {t("tel")}: +90 (0212) 458 45 00
        </a>
        <a className="fs-6" href="tel:+9005554000005">
          {t("tel")} 2: +90 (0555) 400 00 05
        </a>
        <a className="fs-6" href="tel:+9005554000011">
          {t("tel")} 3: +90 (0555) 400 00 11
        </a>
        <a className="fs-6" href="mailto:info@solastore.com.tr">
          е-мейл: info@solastore.com.tr
        </a>
      </div>
    </div>
  );
}
