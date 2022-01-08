import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

import sources from "../../../sources";
import StoryCard from "../../components/Cards/StoryCard";
import styles from "./Stories.module.css";

// const storiesData = [
//   {
//     productName: "Jeremy",
//     img: "ae56bd13-d.jpg",
//   },
//   {
//     profile_name: "Meko222",
//     video_url: "59c495ab-4.jpg",
//   },
//   {
//     profile_name: "Chupachup",
//     video_url: "7225f052-3.jpg",
//   },
//   {
//     profile_name: "Aron",
//     video_url: "e6ed01a9-3.jpg",
//   },
// ];

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
          autoplay={{
            delay: 1000,
          }}
          breakpoints={{
            300: {
              slidesPerView: 3,
            },
            540: {
              slidesPerView: 5,
            },
          }}>
          {stories.map((story, index) => (
            <SwiperSlide
              className="d-flex flex-column align-items-center justify-content-center mx-2"
              key={`${story.masterProductID}_?_${index}`}>
              <div
                className={`${styles["cover-image-box"]} align-self-start`}
                onClick={() => handleStories(story)}>
                <img
                  className="cursor-pointer"
                  src={`${sources.imageMinSrc}${story.picture_1}`}
                />
              </div>
              <p className="fs-6 text-end text-wrap my-1 w-100 ">
                {story.productShortName}
              </p>
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
