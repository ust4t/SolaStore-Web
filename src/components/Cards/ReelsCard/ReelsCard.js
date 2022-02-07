import React from "react";

import {
  reelsContainer,
  reelsImgContainer,
  reelsImg,
} from "./ReelsCard.module.css";

export default function ReelsCard() {
  return (
    <div className={reelsContainer}>
      <div className={reelsImgContainer}>
        <video
          className={reelsImg}
          src="https://www.pexels.com/video/4040354/download/?search_query=&amp;tracking_id=g3wtpofrf5p"
        />
      </div>
    </div>
  );
}
