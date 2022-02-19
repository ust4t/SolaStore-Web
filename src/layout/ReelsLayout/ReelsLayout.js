import React, { useEffect, useCallback, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  emblaMain,
  embla__viewport,
  embla__container,
  reelsContainer,
} from "./ReelsLayout.module.css";
import ReelsCard from "../../components/Cards/ReelsCard";
import ShareModal from "../../components/Modals/ShareModal";
import sources from "../../../sources";
import { useSelector } from "react-redux";

export default function ReelsLayout({ reels, onClose }) {
  const { page } = useSelector((state) => state);
  const [slidesInView, setSlidesInView] = useState([]);
  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
    startIndex: page.lastIndex || 0,
  });
  const [shareModal, setShareModal] = useState({
    isOpen: false,
    details: {
      url: "",
      name: "",
      id: "",
      picture: "",
    },
  });
  const videoRef = useRef([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    if (videoRef.current.length) {
      videoRef.current.forEach((video) => {
        video.currentTime = 0;
        video.pause();
      });
      videoRef.current[embla.selectedScrollSnap()].play();
    }
  }, [embla, videoRef]);

  const findSlidesInView = useCallback(() => {
    if (!embla) return;

    setSlidesInView((slidesInView) => {
      if (slidesInView.length === embla.slideNodes().length) {
        embla.off("select", findSlidesInView);
      }
      const inView = embla
        .slidesInView(true)
        .filter((index) => slidesInView.indexOf(index) === -1);
      return slidesInView.concat(inView);
    });
  }, [embla, setSlidesInView]);

  useEffect(() => {
    if (!embla) return;
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        embla.scrollNext();
      } else if (e.key === "ArrowUp") {
        embla.scrollPrev();
      }
    });
    findSlidesInView();
    onSelect();
    embla.on("select", onSelect);
    embla.on("select", findSlidesInView);
  }, [embla, onSelect, findSlidesInView]);

  return (
    <div className={reelsContainer}>
      <div className={emblaMain}>
        <ShareModal
          show={shareModal.isOpen}
          handleClose={() =>
            setShareModal({
              ...shareModal,
              isOpen: false,
            })
          }
          urlDetails={shareModal.details}
        />
        <div className={embla__viewport} ref={viewportRef}>
          <div className={embla__container}>
            {reels.map(
              ({ shortName, guidName, masterProductID, pic1 }, index) => {
                return (
                  <ReelsCard
                    onClose={onClose}
                    setShareModal={setShareModal}
                    key={`${masterProductID}.._|${index}`}
                    embla={embla}
                    reelsData={{
                      name: shortName,
                      id: masterProductID,
                      video: `${sources.videos}${guidName}`,
                      index,
                      picture: `${sources.imageMidSrc}${pic1}`,
                      reelsLength: reels.length,
                    }}
                    videoRef={videoRef}
                    inView={slidesInView.indexOf(index) > -1}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
