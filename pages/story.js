import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import ReelsLayout from "../src/layout/ReelsLayout/ReelsLayout";

export default function StoryPage({ storyData }) {
  const [reelsOpen, setReelsOpen] = useState(true);

  function handleClose() {
    // setReelsOpen(false);
    // document.getElementById("zuck-modal").style.display = "block";
    Router.push("/");
  }

  return (
    <ReelsLayout open={reelsOpen} onClose={handleClose} reels={storyData} />
  );
}

export async function getServerSideProps({ query, locale }) {
  const { page, pageSize } = query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetAllStory?pageNumber=${
      page || 1
    }&pageSize=${pageSize || 50}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      storyData: data.data,
    },
  };
}
