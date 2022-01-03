import React from "react";
import { HeartOutline, Heart as HeartIcon } from "react-ionicons";

function Heart({ isLiked, setIsLiked }) {
  if (typeof isLiked !== "boolean" || typeof setIsLiked !== "function")
    return null;

  return (
    <div className="heart-container" onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
        <HeartIcon
          title="heart"
          beat
          color={"#f44336"}
          height="25px"
          width="25px"
        />
      ) : (
        <HeartOutline color={"#f44336"} height="25px" width="25px" />
      )}
    </div>
  );
}

export default Heart;
