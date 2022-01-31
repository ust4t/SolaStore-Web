import React from "react";

import { heart_container } from "./Heart.module.css";

function Heart({ isLiked, setIsLiked, size }) {
  const toggleLike = () => setIsLiked(!isLiked);

  return (
    <div
      style={{
        zIndex: "229",
      }}
      className={`${heart_container} animate__pulse`}
      onClick={toggleLike}>
      {isLiked ? (
        <i class="fas fa-heart fa-2x animate__pulse text-danger" />
      ) : (
        <i className="far fa-heart fa-2x  text-danger" />
      )}
    </div>
  );
}

export default Heart;
