import React, { useEffect, useCallback, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import {
  emblaMain,
  embla__viewport,
  embla__container,
  embla__slide,
  embla__slide__inner,
  embla__slide__img,
  reelsContainer,
  reelsFooter,
  videoFooter__record,
} from "./ReelsCard.module.css";
import Heart from "../../Heart";
import sources from "../../../../sources";

const ReelsCard = ({ reels }) => {
  const [viewportRef, embla] = useEmblaCarousel({
    axis: "y",
    skipSnaps: false,
    loop: true,
  });
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef([]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    videoRef.current.forEach((video) => {
      video.currentTime = 0;
      video.pause();
    });
    videoRef.current[embla.selectedScrollSnap()].play();
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  return (
    <div className={reelsContainer}>
      <div className={emblaMain}>
        <div className={embla__viewport} ref={viewportRef}>
          <div className={embla__container}>
            {reels &&
              reels
                .filter((reel) => reel.video_1 !== null)
                .map(
                  ({ productShortName, video_1, masterProductID }, index) => {
                    return (
                      <div
                        className={embla__slide}
                        key={`${masterProductID}.._|`}>
                        <div className={embla__slide__inner}>
                          <video
                            autoPlay={index === 0}
                            onEnded={() =>
                              embla &&
                              embla.scrollTo(embla.selectedScrollSnap() + 1)
                            }
                            ref={(el) => (videoRef.current[index] = el)}
                            controls
                            className={embla__slide__img}
                            src={`${sources.videos}${video_1}`}
                          />
                        </div>
                        <div
                          style={{
                            gap: "45px",
                            zIndex: "5",
                            bottom: "25px",
                            right: "5px",
                          }}
                          className="position-absolute  d-flex flex-column justify-content-center align-items-center">
                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              filter: "drop-shadow(0px 0px 10px #000)",
                            }}>
                            <Heart
                              isLiked={isLiked}
                              setIsLiked={setIsLiked}
                              onClick={() => {
                                console.log("clicked");
                              }}
                            />
                            <h6 className="text-white">Нравится</h6>
                          </div>
                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              filter: "drop-shadow(0px 0px 10px #000)",
                            }}>
                            <i
                              className="fas fa-plus text-white"
                              style={{
                                fontSize: "30px",
                              }}
                            />
                            <h6 className="text-white">Добавлять</h6>
                          </div>

                          <div
                            style={{
                              display: "grid",
                              placeItems: "center",
                              filter: "drop-shadow(0px 0px 10px #000)",
                            }}>
                            <i
                              className="fas fa-share text-white"
                              style={{
                                fontSize: "30px",
                              }}
                            />
                            <h6 className="text-white">доля</h6>
                          </div>
                          <i
                            className={`fas fa-compact-disc text-white ${videoFooter__record}`}
                          />
                        </div>
                        <div
                          className={`row position-absolute bottom-0 start-0 p-2 ${reelsFooter}`}>
                          <div className="col-12">
                            <h3 className="text-white fs-3">
                              {productShortName}
                            </h3>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelsCard;
