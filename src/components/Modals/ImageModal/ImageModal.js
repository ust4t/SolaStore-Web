import React, { memo, useEffect, useRef } from "react";
import { Modal, Tab } from "react-bootstrap";

import sources from "../../../../sources";
import { Arrow } from "../../sliders/SliderArrows";
import {
  arrow,
  arrowLeft,
  arrowRight,
  videoStyle,
  modalContainer,
  modalBg,
  close_icon,
} from "../../product/Details.module.css";
import Zoom from "../../Zoom";
import useDetectOutside from "../../../hooks/useDetectOutside";

function ImageModal({
  show,
  handleClose,
  onClickPrev,
  onClickNext,
  imageKey,
  product,
}) {
  const videoRef = useRef();
  const imageRef = useRef();

  useDetectOutside(imageRef, hideImage);

  function hideImage() {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    handleClose();
  }

  const checkImage = ({ source, img }) =>
    product.picture_1 ? `${source}${img}` : "/images/placeholder.jpg";

  useEffect(() => {
    if (videoRef.current) {
      if (imageKey === product.pictures.length) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [imageKey]);

  return (
    <Modal
      show={show}
      onShow={() => {
        if (product.video_1 && videoRef.current) videoRef.current.pause();
      }}
      onHide={handleClose}
      centered
      contentClassName={modalBg}
      dialogClassName={modalContainer}
      aria-labelledby="image-modal-title">
      <Modal.Body className="position-relative">
        <i
          style={{
            zIndex: "1",
          }}
          className={`fa fa-times position-absolute cursor-pointer ${close_icon}`}
          onClick={handleClose}
        />
        <Tab.Container activeKey={`tum-${imageKey}`} defaultActiveKey={`tum-0`}>
          <div
            ref={imageRef}
            className="pro-details-tab d-flex d-lg-block flex-column">
            <Tab.Content className="tab-content custom-content position-relative">
              <Arrow
                onClick={onClickPrev}
                className={`${arrow} ${arrowLeft}`}
                icon="fas fa-arrow-left"
              />
              {product.video_1 && (
                <Tab.Pane eventKey={`tum-${product.pictures.length}`}>
                  <video
                    id="videoProductDetail"
                    controls
                    autoPlay
                    ref={videoRef}
                    className={videoStyle}>
                    <source
                      src={`${sources.videos}${product.video_1}`}
                      type="video/mp4"
                    />
                  </video>
                </Tab.Pane>
              )}
              {product &&
                product.pictures.map((img, i) => (
                  <Tab.Pane
                    key={`${i}.-.-${i}`}
                    eventKey={`tum-${i}`}
                    style={{ maxWidth: "900px" }}>
                    <Zoom
                      className="detail-image-front"
                      width="600"
                      height="900"
                      layout="responsive"
                      alt={product.productShortName}
                      src={checkImage({
                        source: sources.imageMaxSrc,
                        img: img.guidName,
                      })}
                      priority
                    />
                  </Tab.Pane>
                ))}
              <Arrow
                onClick={onClickNext}
                className={`${arrow} ${arrowRight}`}
                icon="fas fa-arrow-right"
              />
            </Tab.Content>
          </div>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}

export default memo(ImageModal);
