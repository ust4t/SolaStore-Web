import React from "react";
import { HeartOutline, Heart as HeartIcon } from "react-ionicons";

function Heart({ isLiked, setIsLiked }) {
  if (typeof isLiked !== "boolean" || typeof setIsLiked !== "function")
    return null;

  return (
    <div className="heart-container" onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
        <HeartIcon color={"red"} height="40px" width="40px" />
      ) : (
        <HeartOutline color={"red"} height="40px" width="40px" />
      )}
    </div>
  );
}

export default Heart;
