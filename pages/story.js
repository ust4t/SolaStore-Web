import axios from "axios";
import Router from "next/router";
import { useEffect } from "react";
import { saveState } from "../src/redux/browser-storage";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import ReelsLayout from "../src/layout/ReelsLayout/ReelsLayout";

export default function StoryPage({ storyData }) {
  const { t } = useTranslation("common");

  function handleClose() {
    Router.push("/");
  }

  useEffect(() => {
    if (!storyData.length) {
      saveState("page", {
        page: 1,
        lastIndex: 0,
      });
      Router.push({
        pathname: "/story",
        query: {
          page: 1,
          pageSize: 25,
        },
      });
    }
  }, [storyData]);

  return (
    <>
      <Head>
        <title>Sola Store | Reels</title>
      </Head>
      <ReelsLayout onClose={handleClose} reels={storyData} />;
    </>
  );
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
