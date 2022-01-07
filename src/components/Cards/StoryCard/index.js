import React, { useState, useEffect, useRef } from "react";

import sources from "../../../../sources";

export default function StoryCard({ onClose, stories }) {
  const [storyPaused, setStoryPaused] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const storyIndexRef = useRef(0);

  useEffect(() => {
    // autoskip for story
    const interval = setInterval(() => {
      if (storyPaused) return;
      if (storyIndexRef.current === stories.length - 1) {
        onClose();
      }
      setStoryIndex(storyIndexRef.current + 1);
    }, stories[storyIndexRef.current].duration * 1000);

    return () => clearInterval(interval);
  }, [storyPaused, storyIndex]);

  useEffect(() => {
    storyIndexRef.current = storyIndex;
  }, [storyIndex]);

  //   useEffect(() => {
  //     if (storyPaused) {
  //       (document.getElementById("video")).pause();
  //     } else {
  //       (document.getElementById("video")).play();
  //     }
  //   }, [storyPaused]);

  function onClickStory(element) {
    // if (element.className === "story-container") onClose();
  }

  console.log(stories[storyIndex]);

  function getProgressBarClassName(index) {
    if (index < storyIndex) {
      return "progress-bar progress-bar-finished";
    } else if (index === storyIndex) {
      return storyPaused
        ? "progress-bar progress-bar-active progress-bar-paused"
        : "progress-bar progress-bar-active";
    } else {
      return "progress-bar";
    }
  }

  return (
    <div
      onClick={(e) => onClickStory(e.target)}
      className="story-container z-index-first">
      <i
        style={{
          top: "20px",
          right: "20px",
        }}
        onClick={() => onClose()}
        class="fas fa-times position-absolute text-white fs-3 cursor-pointer"></i>
      <div className="story justify-content-end pt-2">
        <div className="title d-flex justify-content-space-between align-items-center">
          <img src="/img/placeholder.jpg" />
          <div className="details">
            <span>#penguin</span>
            <span>username</span>
          </div>
          <div className="spacer"></div>
          {storyPaused && <div className="pause">PAUSED</div>}
        </div>
        <div className="progress-bars">
          {stories.map((story, index) => (
            <div className="progress-bar-container">
              <div
                style={{ animationDuration: `${story?.duration || 10}s` }}
                className={getProgressBarClassName(index)}></div>
            </div>
          ))}
        </div>
        <div className="storyEl position-relative w-100">
          <img
            onClick={(e) => setStoryPaused(!storyPaused)}
            id="video"
            src={`${sources.imageMaxSrc}${stories[storyIndex].video_url}`}
          />
          {storyIndex !== 0 && (
            <i
              className="fas fa-chevron-left bg-white position-absolute top-50 translate-middle fs-5 text-center cursor-pointer px-2 py-1 rounded-circle"
              style={{
                opacity: 0.5,
                left: "-40px",
              }}
              onClick={(e) => setStoryIndex((value) => value - 1)}></i>
          )}
          {storyIndex !== stories.length - 1 && (
            <i
              class="fas fa-chevron-right bg-white position-absolute top-50 translate-middle fs-5 text-center cursor-pointer px-2 py-1 rounded-circle"
              style={{
                opacity: 0.5,
                right: "-60px",
              }}
              color="white"
              onClick={(e) => setStoryIndex((value) => value + 1)}></i>
          )}
          <button
            className="btn-main position-absolute top-50 start-50 translate-middle-x fs-5 text-center text-white cursor-pointer px-2 py-1 rounded"
            style={{
              backgroundColor: "rgba(0,0,0,0.75)",
            }}
            onClick={() => alert("clicked")}>
            Ürünü Görüntüle
          </button>
        </div>
      </div>
    </div>
  );
}
