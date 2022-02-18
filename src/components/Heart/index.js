import React from "react";

import { heart_container, beat_anim } from "./Heart.module.css";

function Heart({ onClick, isLiked, className, style }) {
  return (
    <div
      className={`${heart_container} animate__pulse cursor-pointer`}
      onClick={onClick}>
      {isLiked ? (
        <i
          className={`fas fa-heart fa-2x ${beat_anim} text-danger ${className}`}
          style={style}
        />
      ) : (
        <i
          className={`far fa-heart fa-2x text-danger ${className}`}
          style={style}
        />
      )}
    </div>
  );
}

export default Heart;
