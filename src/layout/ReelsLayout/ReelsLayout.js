import React, { useEffect, useCallback, useRef, useState } from "react";
import dynamic from "next/dynamic";
import useEmblaCarousel from "embla-carousel-react";
import {
  emblaMain,
  embla__viewport,
  embla__container,
  reelsContainer,
  reelsOpen,
  reelsClose,
} from "./ReelsLayout.module.css";
import ReelsCard from "../../components/Cards/ReelsCard";
import ShareModal from "../../components/Modals/ShareModal";
import sources from "../../../sources";

export default function ReelsLayout({ reels, onClose, open }) {
  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
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

  useEffect(() => {
    if (!open) {
      videoRef.current.forEach((video) => {
        video.currentTime = 0;
        video.pause();
      });
    }
  }, [open]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className={`${reelsContainer} ${open ? reelsOpen : reelsClose}`}>
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
            {reels &&
              reels.map(
                (
                  { productShortName, video_1, masterProductID, picture_1 },
                  index
                ) => {
                  return (
                    <ReelsCard
                      onClose={onClose}
                      setShareModal={setShareModal}
                      key={`${masterProductID}.._|${index}`}
                      embla={embla}
                      reelsData={{
                        name: productShortName,
                        id: masterProductID,
                        video: video_1,
                        index,
                        picture: `${sources.imageMidSrc}${picture_1}`,
                        reelsLength: reels.length,
                      }}
                      videoRef={videoRef}
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
