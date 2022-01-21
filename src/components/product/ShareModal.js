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
import sources from "../../../sources";

const shareUrl = "https://solastore.vercel.app/detail/";

export default function ShareModal({ show, handleClose, urlDetails }) {
  const { t } = useTranslation("common");

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="modal-30w justify-content-center w-50"
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
              style={{
                backgroundColor: "var(--color-light)",
                pointerEvents: "auto",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              onClick={(e) => {
                const text = e.target.value;
                e.target.select();
                e.target.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(text);
              }}
              value={`${shareUrl}${urlDetails.id}`}
              className="py-10 text-center w-50 cursor-pointer border-0"
            />
          </div>
          <div className="row px-2 mx-0 gy-3">
            <div className="col-2">
              <WhatsappShareButton
                url={`${shareUrl}${urlDetails.id}`}
                title="Solastore"
                separator=":: ">
                <WhatsappIcon size={55} round={true} />
              </WhatsappShareButton>
            </div>
            <div className="col-2">
              <TelegramShareButton
                url={`${shareUrl}${urlDetails.id}`}
                title="Solastore"
                separator=":: ">
                <TelegramIcon size={55} round={true} />
              </TelegramShareButton>
            </div>
            <div className="col-2">
              <FacebookShareButton
                url={`${shareUrl}${urlDetails.id}`}
                quote="Solastore"
                hashtag="#solastore">
                <FacebookIcon size={55} round={true} />
              </FacebookShareButton>
            </div>
            <div className="col-2">
              <FacebookMessengerShareButton
                url={`${shareUrl}${urlDetails.id}`}
                quote="Solastore"
                hashtag="#solastore">
                <FacebookMessengerIcon size={55} round={true} />
              </FacebookMessengerShareButton>
            </div>
            <div className="col-2">
              <TwitterShareButton
                url={`${shareUrl}${urlDetails.id}`}
                title="Solastore"
                hashtags={["solastore"]}>
                <TwitterIcon size={55} round={true} />
              </TwitterShareButton>
            </div>
            <div className="col-2">
              <PinterestShareButton
                url={`${shareUrl}${urlDetails.id}`}
                media={`${
                  urlDetails.pictures[0]
                    ? `${sources.imageMidSrc}${urlDetails.pictures[0].guidName}`
                    : "/img/placeholder.jpg"
                }`}>
                <PinterestIcon size={55} round={true} />
              </PinterestShareButton>
            </div>
            <div className="col-2">
              <VKShareButton
                url={`${shareUrl}${urlDetails.id}`}
                title="Solastore"
                description="Solastore"
                image={`${
                  urlDetails.pictures[0]
                    ? `${sources.imageMidSrc}${urlDetails.pictures[0].guidName}`
                    : "/img/placeholder.jpg"
                }`}>
                <VKIcon size={55} round={true} />
              </VKShareButton>
            </div>
            <div className="col-2">
              <RedditShareButton
                url={`${shareUrl}${urlDetails.id}`}
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
