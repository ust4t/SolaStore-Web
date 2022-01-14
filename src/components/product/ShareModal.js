import React from "react";
import { Modal } from "react-bootstrap";
import { WhatsappIcon, WhatsappShareButton } from "react-share";

export default function ShareModal({ show, handleClose, urlDetails }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="border-0">
        <div className="product-details-area product-modal">
          <div>
            <i className="fa fa-times modal-icon " onClick={handleClose} />
          </div>
          <div className="row">
            <h2 className="text-center">Ürünü Paylaş</h2>
          </div>
          <div className="row">
            <div className="col-2">
              <WhatsappShareButton
                url={`https://solastore.vercel.app/detail/${urlDetails.id}`}
                title="Solastore"
                separator=":: ">
                <WhatsappIcon size={55} round={true} />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
