import React, { Component } from "react";
import Zuck from "zuck.js";
import withTranslation from "next-translate/withTranslation";

import sources from "../../../../sources";
import { timestamp } from "../../../utils/utils";

class ZuckStories extends Component {
  constructor(props) {
    super(props);
    this.storiesElement = null;
    this.storiesApi = null;
    const { t } = this.props.i18n;
    this.state = {
      stories: this.props.storiesData.map((story, i) =>
        Zuck.buildTimelineItem(
          story.masterProductID,
          `${sources.imageMinSrc}${story.picture_1}`,
          story.productShortName,
          `/detail/${story.productShortName.toLowerCase().replace(" ", "-")}:${
            story.masterProductID
          }`,
          timestamp(),
          story.pictures.map((subStory) => [
            story.masterProductID,
            "photo",
            story.pictures.length,
            `${sources.imageMaxSrc}${subStory.guidName}`,
            `${sources.imageMaxSrc}${subStory.guidName}`,
            `/detail/${story.productShortName
              .toLowerCase()
              .replace(" ", "-")}:${story.productID}`,
            t("home:seeProduct"),
            false,
            timestamp(),
          ])
        )
      ),
    };
  }

  componentDidMount() {
    let stories = new Zuck(this.storiesElement, {
      skin: "snapgram", // container class
      avatars: true, // shows user photo instead of last story item preview
      list: false, // displays a timeline instead of carousel
      openEffect: true, // enables effect when opening story - may decrease performance
      cubeEffect: true, // enables the 3d cube effect when sliding story - may decrease performance
      autoFullScreen: false, // enables fullscreen on mobile browsers
      backButton: true, // adds a back button to close the story viewer
      backNative: false, // uses window history to enable back button on browsers/android
      previousTap: true, // use 1/3 of the screen to navigate to previous item when tap the story
      localStorage: true, // set true to save "seen" position. Element must have a id to save properly.
      reactive: true, // set true if you use frameworks like React to control the timeline (see react.sample.html)
      callbacks: {
        onDataUpdate: function (currentState, callback) {
          this.setState(
            (state) => {
              state.stories = currentState;
              return state;
            },
            () => {
              callback();
            }
          );
        }.bind(this),
      },
      stories: this.state.stories,
    });
  }

  render() {
    const timelineItems = [];

    this.state.stories.map((story, storyId) => {
      const storyItems = [];

      story.items.map((storyItem, i) => {
        storyItems.push(
          <li
            key={`${storyItem.id}.|${i}`}
            data-id={storyItem.id}
            data-time={storyItem.time}
            className={storyItem.seen ? "seen" : ""}>
            <a
              href={storyItem.src}
              data-type={storyItem.type}
              data-length={storyItem.length}
              data-link={storyItem.link}
              data-linktext={storyItem.linkText}>
              <img src={storyItem.preview} />
            </a>
          </li>
        );
      });

      let arrayFunc = story.seen ? "push" : "unshift";
      timelineItems[arrayFunc](
        <div
          className={story.seen ? "story seen" : "story"}
          key={story.photo}
          data-id={storyId}
          data-last-updated={story.lastUpdated}
          data-photo={story.photo}>
          <a className="item-link" href={story.link}>
            <span className="item-preview">
              <img src={story.photo} />
            </span>
            <span
              className="info"
              itemProp="author"
              itemScope=""
              itemType="http://schema.org/Person">
              <strong className="name" itemProp="name">
                {story.name}
              </strong>
              <span className="time">{story.lastUpdated}</span>
            </span>
          </a>

          <ul className="items">{storyItems}</ul>
        </div>
      );
    });

    return (
      <div>
        <div
          ref={(node) => (this.storiesElement = node)}
          id="stories-react"
          className="position-relative storiesWrapper d-flex justify-content-center my-2 my-md-3">
          {timelineItems}
        </div>
        {/* <div
          onClick={this.props.onOpen}
          className="storiesWrapper position-fixed stories user-icon carousel snapgram"
          style={{
            top: "50%",
            right: "20px",
            zIndex: "400",
          }}>
          <div className="story">
            <a className="item-link" href="#">
              <span className="item-preview">
                <img src="https://solastore.com.tr/img/ProductWM/minPic/a07bc882-9.jpg" />
              </span>
            </a>
          </div>
        </div> */}
      </div>
    );
  }
}

export default withTranslation(ZuckStories);
