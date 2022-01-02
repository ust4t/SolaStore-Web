import React from "react";

const BANNER_HEIGHT = 128;
const VIDEO_VISIBLE_HEIGHT = 250;

export default function VideoLayout() {
  return (
    <div
      style={{
        // This `position` style is important!
        // We need it so the `Video` component can align
        // itself with this root `App` component.
        position: "relative",
      }}>
      <Banner />

      <Video />

      <Banner
        style={{
          // We just offset the bottom banner to give
          // the video a bit of room to peek out.
          marginTop: VIDEO_VISIBLE_HEIGHT,
        }}
      />
    </div>
  );
}

// The purple bars over the video, above and below the video.
function Banner({ style }) {
  return (
    <div
      style={{
        height: BANNER_HEIGHT,
        ...style,
      }}></div>
  );
}

// The video element we render in between the two banners.
function Video() {
  return (
    <div
      style={{
        // We position the video wrapper absolutely
        // to the top of the parent element
        // (the div in the `App` component).
        // This only works because we set a `position` in `App`.
        position: "absolute",
        top: 0,

        // To make sure the video is
        // rendered underneath both banners.
        zIndex: -1,

        // Flex box with these "center" styles to
        // always center the video, both horizontally
        // and vertically.
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        // 100% width/height for the horizontal/vertical
        // alignments with flex to work nicely.
        width: "100%",
        height: "100%",

        // Hide any overflow, in case the video sticks-out
        // below the second banner, which can happen if
        // the screen size gets too wide.
        overflow: "hidden",

        // Note, that using `border` increases the
        // element's size by default, so we change
        // that behavior with `boxSizing`.
        boxSizing: "border-box",
        background: "rgba(0,0,0,.4)",
      }}>
      <video
        src="https://www.meetup.com/mu_static/pt-BR/video.dddafbfe.mp4"
        autoPlay
        loop
        style={{
          // The video is allowed to scale it's width
          // to the width of the wrapper.
          width: "100%",
          // But the height should auto adjust
          // to keep the aspect-ratio.
          // Note, 'auto' is the default value anyway,
          // so you could actually leave this `height` out.
          height: "auto",
        }}>
        <source
          src="https://www.meetup.com/mu_static/pt-BR/video.dddafbfe.mp4"
          type="video/mp4"
        />
        Seu navegador é incompatível para reprodução de vídeos!
      </video>
    </div>
  );
}
