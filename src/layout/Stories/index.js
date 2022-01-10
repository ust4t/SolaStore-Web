import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import sources from "../../../sources";
import StoryCard from "../../components/Cards/StoryCard";
import styles from "./Stories.module.css";

export default function Stories({ stories }) {
  const [storiesData, setStoriesData] = useState([]);
  const [storiesOpen, setStoriesOpen] = useState(false);
  function closeStory() {
    setStoriesOpen(false);
  }
  console.log(stories);

  const handleStories = (story) => {
    setStoriesData({
      id: story.masterProductID,
      productName: story.productShortName,
      productStock: story.productStockCode,
      img: story.pictures,
    });
    setStoriesOpen(true);
  };

  return (
    <div className="d-flex align-center justify-content-center my-4">
      <div className="slider-main">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={5}
          breakpoints={{
            300: {
              slidesPerView: 3,
            },
            540: {
              slidesPerView: 5,
            },
          }}>
          {stories
            .slice(0, stories.length >= 6 ? 6 : stories.length)
            .map((story, index) => (
              <SwiperSlide key={`${story.masterProductID}_?_${index}`}>
                <div className="d-flex flex-column flex-wrap align-content-center justify-content-center mx-2">
                  <div
                    className={`${styles["cover-image-box"]} align-self-start`}
                    onClick={() => handleStories(story)}>
                    <img
                      className="cursor-pointer"
                      src={`${sources.imageMinSrc}${story.picture_1}`}
                    />
                  </div>
                  <p className="fs-6 text-center text-wrap ">
                    {story.productShortName}
                  </p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {storiesOpen && (
        <StoryCard storiesData={storiesData} onClose={closeStory} />
      )}
    </div>
  );
}
