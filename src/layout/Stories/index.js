import React, { useCallback, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

import sources from "../../../sources";
import styles, {
  embla__slide,
  embla__slide__inner,
} from "./Stories.module.css";
import EmblaSlider from "../../components/EmblaSlider";
const StoryCard = dynamic(() => import("../../components/Cards/StoryCard"));

export default function Stories({ stories }) {
  const [storiesData, setStoriesData] = useState([]);
  const [storiesOpen, setStoriesOpen] = useState(false);
  function closeStory() {
    setStoriesOpen(false);
  }

  const handleStories = useCallback(
    (story) => {
      setStoriesData({
        id: story.masterProductID,
        productName: story.productShortName,
        productStock: story.productStockCode,
        img: story.pictures,
      });
      setStoriesOpen(true);
    },
    [storiesData]
  );

  return (
    <div className="d-flex align-center justify-content-center my-4">
      <EmblaSlider
        config={{
          loop: false,
          dragFree: true,
          skipSnaps: false,
          align: "center",
          startIndex: 3,
        }}>
        {stories
          .slice(0, stories.length >= 6 ? 6 : stories.length)
          .map((story, index) => (
            <div
              className={embla__slide}
              key={`${story.masterProductID}_?_${index}`}>
              <div className={embla__slide__inner}>
                <div className="d-flex flex-column flex-wrap align-content-center justify-content-center mx-2">
                  <div
                    style={{
                      minWidth: "120px",
                      height: "120px",
                    }}
                    className={`${styles["cover-image-box"]} align-self-start`}
                    onClick={() => handleStories(story)}>
                    <Image
                      className="cursor-pointer p-1"
                      src={`${sources.imageMinSrc}${story.picture_1}`}
                      layout="fill"
                      priority
                      placeholder="blur"
                      blurDataURL="/img/loadingImg.jpg"
                    />
                  </div>
                  <p className="fs-6 text-center text-wrap ">
                    {story.productShortName}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </EmblaSlider>

      {storiesOpen && (
        <StoryCard storiesData={storiesData} onClose={closeStory} />
      )}
    </div>
  );
}
