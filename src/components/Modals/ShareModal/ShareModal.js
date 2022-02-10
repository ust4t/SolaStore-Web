import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Modal } from "react-bootstrap";
import {
  WhatsappIcon,
  WhatsappShareButton,
  FacebookIcon,
  FacebookShareButton,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  PinterestIcon,
  PinterestShareButton,
  VKIcon,
  VKShareButton,
  RedditIcon,
  RedditShareButton,
} from "react-share";

import { modalContainer, copyText } from "./ShareModal.module.css";
import sources from "../../../../sources";

export default function ShareModal({ show, handleClose, urlDetails }) {
  const url = `${urlDetails.url}${urlDetails.name
    .toLowerCase()
    .replace(" ", "-")}:${urlDetails.id}`;
  const { t } = useTranslation("common");

  const handleCopyText = (e) => {
    const text = e.target.value;
    e.target.select();
    e.target.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(text);
  };

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
          <div className="row">
            <h2 className="text-center">{t("share")}</h2>
          </div>
          <div className="row justify-content-center py-3">
            <input
              readOnly
              onClick={handleCopyText}
              value={url}
              className={`py-10 text-center cursor-pointer border-0 ${copyText}`}
            />
          </div>
          <div className="row px-md-2 mx-0 gy-3">
            <div className="col-3 col-md-2">
              <WhatsappShareButton url={url} title="Solastore" separator=": ">
                <WhatsappIcon size={55} round={true} />
              </WhatsappShareButton>
            </div>
            <div className="col-3 col-md-2">
              <TelegramShareButton url={url} title="Solastore" separator=": ">
                <TelegramIcon size={55} round={true} />
              </TelegramShareButton>
            </div>
            <div className="col-3 col-md-2">
              <FacebookShareButton
                url={url}
                quote="Solastore"
                hashtag="#solastore">
                <FacebookIcon size={55} round={true} />
              </FacebookShareButton>
            </div>
            <div className="col-3 col-md-2">
              <FacebookMessengerShareButton
                url={url}
                quote="Solastore"
                hashtag="#solastore">
                <FacebookMessengerIcon size={55} round={true} />
              </FacebookMessengerShareButton>
            </div>
            <div className="col-3 col-md-2">
              <TwitterShareButton
                url={url}
                title="Solastore"
                hashtags={[
                  "solastore",
                  "wholesale",
                  "fashion",
                  "Women's Clothing",
                ]}>
                <TwitterIcon size={55} round={true} />
              </TwitterShareButton>
            </div>
            <div className="col-3 col-md-2">
              <PinterestShareButton
                url={url}
                media={`${
                  urlDetails.picture
                    ? `${sources.imageMidSrc}${urlDetails.picture}`
                    : "/images/placeholder.jpg"
                }`}>
                <PinterestIcon size={55} round={true} />
              </PinterestShareButton>
            </div>
            <div className="col-3 col-md-2">
              <VKShareButton
                url={url}
                title="Solastore"
                description="Solastore"
                image={`${
                  urlDetails.picture
                    ? `${sources.imageMidSrc}${urlDetails.picture}`
                    : "/images/placeholder.jpg"
                }`}>
                <VKIcon size={55} round={true} />
              </VKShareButton>
            </div>
            <div className="col-3 col-md-2">
              <RedditShareButton
                url={url}
                title="Solastore"
                windowWidth={660}
                windowHeight={460}>
                <RedditIcon size={55} round={true} />
              </RedditShareButton>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
