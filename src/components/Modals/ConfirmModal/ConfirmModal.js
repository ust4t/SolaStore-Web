import React from "react";
import { Modal } from "react-bootstrap";

import {
  modalContainer,
  modalCancelButton,
  modalButton,
} from "./ConfirmModal.module.css";

export default function ConfirmModal({
  show,
  handleClose,
  handleConfirm,
  handleCancel,
  title,
}) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName={modalContainer}
      aria-labelledby="share-modal-title">
      <Modal.Body>
        <div className="product-details-area product-modal">
          <div>
            <i className="fa fa-times modal-icon " onClick={handleClose} />
          </div>

          <div className="row justify-content-center px-md-2 mx-0 gy-3">
            <div className="col-12">
              <h2 className="text-center">{title}</h2>
            </div>
            <div className="col-6 col-sm-4">
              <button
                className={`btn grenbtn1 text-uppercase ${modalButton}`}
                onClick={handleConfirm}>
                Ok
              </button>
            </div>
            <div className="col-6 col-sm-4">
              <button
                className={`btn grenbtn1 text-uppercase ${modalButton} ${modalCancelButton}`}
                onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
