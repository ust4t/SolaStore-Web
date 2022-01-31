import React from "react";
import { HeartOutline, Heart as HeartIcon } from "react-ionicons";

function Heart({ isLiked, setIsLiked, size }) {
  if (typeof isLiked !== "boolean" || typeof setIsLiked !== "function")
    return null;

  return (
    <div
      style={{
        zIndex: "229",
      }}
      className="heart-container"
      onClick={() => setIsLiked(!isLiked)}>
      <i className="fas fa-heart" />{" "}
      {/* {isLiked ? (
        <HeartIcon
          title="heart"
          beat
          color={"#f44336"}
          height={size}
          width={size}
        />
      ) : (
        <HeartOutline color={"#f44336"} height={size} width={size} />
      )} */}
    </div>
  );
}

export default Heart;
