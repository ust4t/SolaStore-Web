import React from "react";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

function Heart({ isLiked, setIsLiked }) {
  if (typeof isLiked !== "boolean" || typeof setIsLiked !== "function")
    return null;

  return (
    <div className="heart-container" onClick={() => setIsLiked(!isLiked)}>
      {isLiked ? (
        <Favorite
          className="animate__animated animate__bounceIn"
          style={{ color: "red" }}
        />
      ) : (
        <FavoriteBorder style={{ color: "red" }} />
      )}
    </div>
  );
}

export default Heart;
