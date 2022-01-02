import { Row } from "antd";
import React from "react";
import Image from "next/image";
import sources from "../../../sources";

function Stories() {
  return (
    <Row className="select-colors">
      {[1, 2, 3, 4, 5, 6].map((variant, i) => (
        <div
          className="story-circle"
          style={{
            cursor: "pointer",
            margin: "10px",
          }}>
          <Image
            key={`${i}__`}
            className="color-select "
            width={80}
            height={80}
            src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
            priority={true}
          />
        </div>
      ))}
    </Row>
  );
}

export default Stories;
