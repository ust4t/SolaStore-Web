import React from "react";

import { heart_container, beat_anim } from "./Heart.module.css";

function Heart({ onClick, isLiked, setIsLiked }) {
  const toggleLike = () => {
    onClick();
    // setIsLiked(!isLiked);
  };

  return (
    <div
      className={`${heart_container} animate__pulse cursor-pointer`}
      onClick={toggleLike}>
      {isLiked ? (
        <i className={`fas fa-heart fa-2x ${beat_anim} text-danger`} />
      ) : (
        <i className="far fa-heart fa-2x  text-danger" />
      )}
    </div>
  );
}

export default Heart;
