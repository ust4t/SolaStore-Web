import React, { useEffect, useCallback, useRef, useState } from "react";
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
import useDetectOutside from "../../hooks/useDetectOutside";

export default function ReelsLayout({ reels, onClose, open }) {
  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
    loop: true,
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
  const reelsRef = useRef(null);

  const onSelect = useCallback(() => {
    if (!embla) return;
    videoRef.current.forEach((video) => {
      video.currentTime = 0;
      video.pause();
    });
    // videoRef.current[embla.selectedScrollSnap()].play();
  }, [embla]);

  useDetectOutside(reelsRef, onClose);

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
          <div ref={reelsRef} className={embla__container}>
            {reels &&
              reels
                .filter((reel) => reel.video_1 !== null)
                .map(
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
                        }}
                        videoRef={videoRef}
                      />

                      //   <div
                      //     className={embla__slide}
                      //     key={`${masterProductID}.._|`}>
                      //     <div className={embla__slide__inner}>
                      //       <video
                      //         onEnded={() =>
                      //           embla &&
                      //           embla.scrollTo(embla.selectedScrollSnap() + 1)
                      //         }
                      //         ref={(el) => (videoRef.current[index] = el)}
                      //         controls
                      //         className={embla__slide__img}
                      //         src={`${sources.videos}${video_1}`}
                      //       />
                      //     </div>
                      //     <div
                      //       style={{
                      //         gap: "45px",
                      //         zIndex: "5",
                      //         bottom: "25px",
                      //         right: "5px",
                      //       }}
                      //       className="position-absolute  d-flex flex-column justify-content-center align-items-center">
                      //       <div
                      //         style={{
                      //           display: "grid",
                      //           placeItems: "center",
                      //           filter: "drop-shadow(0px 0px 10px #000)",
                      //         }}>
                      //         <Heart
                      //           isLiked={isLiked}
                      //           // setIsLiked={setIsLiked}
                      //           onClick={() => handleLike(masterProductID)}
                      //         />
                      //         <h6 className="text-white">Нравится</h6>
                      //       </div>
                      //       <div
                      //         onClick={() => handleAddToCart(masterProductID)}
                      //         style={{
                      //           display: "grid",
                      //           placeItems: "center",
                      //           filter: "drop-shadow(0px 0px 10px #000)",
                      //           cursor: "pointer",
                      //         }}>
                      //         <i
                      //           className="fas fa-plus text-white"
                      //           style={{
                      //             fontSize: "30px",
                      //           }}
                      //         />
                      //         <h6 className="text-white">Добавлять</h6>
                      //       </div>

                      //       <div
                      //         style={{
                      //           display: "grid",
                      //           placeItems: "center",
                      //           filter: "drop-shadow(0px 0px 10px #000)",
                      //         }}>
                      //         <i
                      //           className="fas fa-share text-white"
                      //           style={{
                      //             fontSize: "30px",
                      //           }}
                      //         />
                      //         <h6 className="text-white">доля</h6>
                      //       </div>
                      //       <i
                      //         className={`fas fa-compact-disc text-white ${videoFooter__record}`}
                      //       />
                      //     </div>
                      //     <div
                      //       className={`row position-absolute bottom-0 start-0 p-2 ${reelsFooter}`}>
                      //       <div className="col-12">
                      //         <h3 className="text-white fs-3">
                      //           {productShortName}
                      //         </h3>
                      //       </div>
                      //     </div>
                      //   </div>
                    );
                  }
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
