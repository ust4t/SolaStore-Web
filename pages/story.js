import axios from "axios";
import Router from "next/router";
import { useState } from "react";
import ReelsLayout from "../src/layout/ReelsLayout/ReelsLayout";

export default function StoryPage({ storyData }) {
  function handleClose() {
    Router.push("/");
  }

  return <ReelsLayout onClose={handleClose} reels={storyData} />;
}

export async function getServerSideProps({ query, locale }) {
  const { page, pageSize } = query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetAllStory?pageNumber=${
      page || 1
    }&pageSize=${pageSize || 25}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      storyData: data.data,
    },
  };
}
