import { memo } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import sources from "../../../../sources";

import {
  videoStyle,
  close_icon,
  modalBtn,
  modalBg,
} from "./VideoModal.module.css";

function VideoModal({ show, handleClose, video, link }) {
  const { t } = useTranslation("home");

  return (
    <Modal
      contentClassName={modalBg}
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="justify-content-center"
      aria-labelledby="share-modal-title">
      <Modal.Body className="px-0">
        <div
          style={{
            maxHeight: "1030px",
          }}
          className="d-flex justify-content-center position-relative">
          <i
            style={{
              zIndex: "1",
            }}
            className={`fa fa-times position-absolute cursor-pointer ${close_icon}`}
            onClick={handleClose}
          />
          <video playsInline controls autoPlay className={videoStyle}>
            <source src={`${sources.videos}${video}`} type="video/mp4" />
          </video>
          <Link href={link}>
            <button className={`btn grenbtn1 position-absolute ${modalBtn}`}>
              {t("seeProduct")}
            </button>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default memo(VideoModal);
