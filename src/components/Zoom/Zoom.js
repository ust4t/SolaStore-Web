import React, { useState } from "react";
import Image from "next/image";
import styles from "./Zoom.module.css";

export default function Zoom({ src, width, height, className, ...rest }) {
  const [imageStyle, setImageStyle] = useState({
    backgroundImage: `none`,
    backgroundPosition: "0% 0%",
    width,
    height,
  });
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setImageStyle({
      ...imageStyle,
      backgroundImage: `url(${src})`,
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () =>
    setImageStyle({
      ...imageStyle,
      backgroundImage: `none`,
      backgroundPosition: "0% 0%",
    });

  return (
    <figure
      className={styles.imgContainer}
      onMouseMove={
        typeof window !== "undefined" &&
        typeof screen.orientation === "undefined"
          ? null
          : handleMouseMove
      }
      onMouseLeave={
        typeof window !== "undefined" &&
        typeof screen.orientation === "undefined"
          ? null
          : handleMouseLeave
      }
      onTouchMove={
        typeof window !== "undefined" &&
        typeof screen.orientation !== "undefined"
          ? null
          : handleMouseMove
      }
      onTouchEnd={
        typeof window !== "undefined" &&
        typeof screen.orientation !== "undefined"
          ? null
          : handleMouseLeave
      }
      style={imageStyle}>
      <Image
        className={`${styles.zoomImg} ${className}`}
        src={src}
        width={width}
        height={height}
        {...rest}
      />
    </figure>
  );
}
