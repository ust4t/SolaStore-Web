import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

import sources from "../../../sources";
import StoryCard from "../../components/Cards/StoryCard";
import styles from "./Stories.module.css";

const storiesData = [
  {
    profile_name: "Jeremy",
    video_url: "ae56bd13-d.jpg",
    duration: 7,
  },
  {
    profile_name: "Meko222",
    video_url: "ae56bd13-d.jpg",
    duration: 7,
  },
  {
    profile_name: "Chupachup",
    video_url: "ae56bd13-d.jpg",
    duration: 7,
  },
  {
    profile_name: "Aron",
    video_url: "ae56bd13-d.jpg",
    duration: 7,
  },
];

export default function Stories() {
  const [storiesOpen, setStoriesOpen] = React.useState(false);

  function closeStory() {
    setStoriesOpen(false);
  }

  return (
    <div class="d-flex align-center justify-content-center my-4">
      <div className="w-50">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          grabCursor={true}
          slidesPerView={5}
          autoplay={{
            delay: 1000,
          }}>
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <SwiperSlide>
              <div
                className={styles["cover-image-box"]}
                onClick={() => setStoriesOpen(true)}>
                <img
                  className="cursor-pointer"
                  src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {storiesOpen && <StoryCard stories={storiesData} onClose={closeStory} />}
    </div>
  );
}
