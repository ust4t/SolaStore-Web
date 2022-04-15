import React from "react";

export default function Mobile() {
  return (
    <div
      style={{
        display: "grid",
        placeContent: "center",
        width: "100%",
      }}>
      <img
        src="/images/Instructions-Mobile.svg"
        style={{
          width: "100%",
          maxWidth: "1000px",
          height: "100%",
          objectFit: "contain",
        }}
        alt="Mobile Instructions"
      />
    </div>
  );
}
