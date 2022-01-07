import Story from "zifi";
import { Component } from "react";
import sources from "../../../sources";

class StoriesSection extends Component {
  render() {
    return (
      <Story fullScreen={true}>
        <Story.Trigger>
          <div>
            <h4>2018's Most Innovative Companies</h4>
            <img
              alt="Tim Cook"
              src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_80%2Cw_300/MTE5NDg0MDU1MzM0OTc5MDg3/tim-cook-20967297-1-402.jpg"
              height="100px"
              width="100px"
            />
          </div>
        </Story.Trigger>
        <Story.Item
          backgroundImage="url(https://pi.tedcdn.com/r/tedideas.files.wordpress.com/2017/03/frugal_innovation.png)"
          blur="10px">
          <div>
            <h1>
              2018's Most Innovative Companies are here{" "}
              <span role="img">🌍</span> <span role="img">🚀</span>
            </h1>
            <p>
              Fast Company just released their picks for the 350+ most
              innovative companies of the year.
            </p>
          </div>
        </Story.Item>
        <Story.Item backgroundImage="linear-gradient(135deg, #fad961 0%,#f76b1c 100%)">
          <div>
            <p>
              <strong>Fast Company </strong>
              <span>Editorial Staff</span>
            </p>
          </div>
          <blockquote>
            The 2018 edition spans more than 350 enterprises across 35
            categories, from the worlds most valuable firm to a small outfit
            selling natural gum to preserve rainforests.
          </blockquote>
        </Story.Item>
        <Story.Item>
          <div>
            <img src={`${sources.imageMinSrc}ae56bd13-d.jpg`} alt="Tim Cook" />
            <p>
              Apple won the coveted #1 spot, with its release of the much-loved
              iPhone X, AirPod, and ARKit platform
            </p>
          </div>
        </Story.Item>
        <Story.Item>
          <p>
            A surprising contender, Patagonia came in sixth in part for their
            focus on helping the environment
          </p>
        </Story.Item>
        <Story.Item backgroundImage="linear-gradient(135deg, #5b247a 0%,#1bcedf 100%);">
          <div>Read More</div>
        </Story.Item>
      </Story>
    );
  }
}

export default StoriesSection;
