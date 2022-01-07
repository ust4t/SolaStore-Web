import React from "react";

import sources from "../../../sources";
import {
  HomePage5UpcomingSlider,
  HomePageProductSliderWithArrow,
  HomeBrandSlider,
} from "../../components/sliders/HomePageSlider";

function Stories() {
  return (
    <div className="select-colors">
      <HomeBrandSlider>
        {[1, 2, 3, 4, 5, 6].map((variant, i) => (
          <div>
            <div
              className="story-circle"
              style={{
                cursor: "pointer",
                margin: "10px",
              }}>
              <img
                key={`${i}__`}
                className="color-select "
                width={80}
                height={80}
                src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
                priority={true}
              />
            </div>
          </div>
        ))}
      </HomeBrandSlider>
    </div>
  );
}

export default Stories;
