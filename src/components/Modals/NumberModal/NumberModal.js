import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Modal } from "react-bootstrap";

import { close_icon, modalBg } from "./NumberModal.module.css";
import {
  subTitle,
  numberInput,
  inputBtn,
} from "../../../layout/EnterNumberLayout/EnterNumberLayout.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import ToastComponent from "../../ToastComponent";

export default function NumberModal({ show, handleClose }) {
  const { t } = useTranslation("phone");
  const [number, setNumber] = React.useState("");

  const sendNumber = async (e) => {
    e.preventDefault();
    if (number === "") {
      toast(
        (ht) => (
          <ToastComponent
            icon="fas fa-exclamation-circle text-danger"
            message={t("nonumber")}
            hotToast={ht}
            messageSize="1.6rem"
          />
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );

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

      toast(
        (ht) => (
          <ToastComponent
            icon="fas fa-check-circle text-success"
            message={t("success")}
            hotToast={ht}
            messageSize="1.6rem"
          />
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );

      handleClose();
    } catch (error) {
      toast(
        (ht) => (
          <ToastComponent
            icon="fas fa-exclamation-circle text-danger"
            message={t("fail")}
            hotToast={ht}
            messageSize="1.6rem"
          />
        ),
        {
          duration: 3000,
          position: "top-center",
        }
      );
    }
  };

  return (
    <Modal
      contentClassName={modalBg}
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="justify-content-center"
      aria-labelledby="share-modal-title">
      <Modal.Body className="px-0">
        <div className="d-flex justify-content-center position-relative">
          <i
            style={{
              zIndex: "1",
            }}
            className={`fa fa-times position-absolute cursor-pointer ${close_icon}`}
            onClick={handleClose}
          />
          <div className="row">
            <div
              style={{
                backgroundImage: 'url("/images/all-bg/newsletter_bg.jpg")',
              }}
              className="col-12 p-4 py-5 d-flex flex-column justify-content-between align-items-center">
              <h3 className="text-white fw-bold text-center text-uppercase">
                {t("title")}
              </h3>
              <div className={subTitle}>
                <h5 className="text-white m-0 text-uppercase">
                  {t("subtitle")}
                </h5>
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
                  <button
                    type="submit"
                    className={`${inputBtn} text-capitalize`}>
                    {t("button")} <i className="fas fa-arrow-circle-right" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
