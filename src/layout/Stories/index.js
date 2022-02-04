import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import EmblaSlider from "../../components/EmblaSlider";
import StoryButton from "../../components/Cards/StoryCard/StoryButton";
const StoryCard = dynamic(() => import("../../components/Cards/StoryCard"));

export default function Stories({ stories }) {
  const [storiesData, setStoriesData] = useState([]);
  const [storiesOpen, setStoriesOpen] = useState(false);

  function closeStory() {
    setStoriesOpen(false);
  }

  const handleStories = useCallback(
    (story) => {
      setStoriesData({
        id: story.masterProductID,
        productName: story.productShortName,
        productStock: story.productStockCode,
        img: story.pictures,
      });
      setStoriesOpen(true);
    },
    [storiesData]
  );

  return (
    <div className="d-flex align-center justify-content-center my-4">
      <EmblaSlider
        config={{
          loop: false,
          dragFree: true,
          skipSnaps: false,
          align: "center",
          startIndex: 3,
        }}>
        {stories
          .slice(0, stories.length >= 6 ? 6 : stories.length)
          .map((story, index) => (
            <StoryButton
              key={`${story.masterProductID}_?_${index}`}
              story={story}
              onStoryClick={() => handleStories(story)}
            />
          ))}
      </EmblaSlider>

      {storiesOpen && (
        <StoryCard storiesData={storiesData} onClose={closeStory} />
      )}
    </div>
  );
}
