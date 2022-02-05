import { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";

import {
  cover_image_box,
  embla__slide,
  embla__slide__inner,
  seen_img,
  seen_container,
} from "./StoryCard.module.css";
import sources from "../../../../sources";

export default function StoryButton({ story, onStoryClick }) {
  const [hasSeen, setHasSeen] = useState(false);
  const storiesState = useSelector((state) => state.stories);

  useEffect(() => {
    if (storiesState[story.productShortName]) {
      setHasSeen(true);
    }
  }, [storiesState]);

  return (
    <div className={embla__slide}>
      <div className={embla__slide__inner}>
        <div
          onClick={onStoryClick}
          className="d-flex flex-column flex-wrap align-content-center justify-content-center cursor-pointer">
          <div
            className={`${cover_image_box} ${
              hasSeen ? seen_container : ""
            } align-self-start`}>
            <Image
              className={`${hasSeen ? seen_img : ""} p-1`}
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
  );
}
