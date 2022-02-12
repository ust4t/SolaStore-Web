import React from "react";
import { Modal } from "react-bootstrap";

import { StoreContext } from "../../../context/StoreProvider";
import Loader from "../../Loader";

export default function PayModal({ show, handleClose, paymentBox, isLoading }) {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="justify-content-center"
      aria-labelledby="share-modal-title">
      <Modal.Body>
        <div
          style={{
            width: "100%",
            minHeight: "100%",
          }}>
          <div>
            <i className="fa fa-times modal-icon " onClick={handleClose} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            paymentBox && (
              <iframe
                srcDoc={paymentBox}
                style={{
                  width: "100%",
                  minHeight: "400px",
                }}
              />
            )
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
