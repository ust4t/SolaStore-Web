import Link from "next/link";
import React from "react";
import { Modal } from "react-bootstrap";
import sources from "../../../../sources";

import {
  videoStyle,
  modalStyle,
  close_icon,
  modalBtn,
  modalBg,
} from "./VideoModal.module.css";

export default function VideoModal({ show, handleClose, video, link }) {
  return (
    <Modal
      contentClassName={modalBg}
      show={show}
      onHide={handleClose}
      dialogClassName={modalStyle}
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
          <video controls autoPlay className={videoStyle}>
            <source src={`${sources.videos}${video}`} type="video/mp4" />
          </video>
          <Link href={link}>
            <button className={`btn grenbtn1 position-absolute ${modalBtn}`}>
              Ürüne Git
            </button>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
