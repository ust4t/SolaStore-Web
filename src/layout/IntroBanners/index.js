import React, { memo, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

import Loader from "../../components/Loader";
import sources from "../../../sources";
import Link from "next/link";
import styles from "./IntroBanners.module.css";
import BannerCard from "../../components/Cards/BannerCard";

const fetchBanners = async () => {
  const { data } = await axios.get("/api/advertisement/getBanners");
  return data;
};

function IntroBanners() {
  const [banners, setBanners] = useState([]);
  const { data, isLoading, error } = useQuery("banners", fetchBanners, {
    onSuccess: ({ data }) => {
      setBanners(data);
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="banner-area pt-90">
          <div className="container">
            <div className="row custom-row align-items-center">
              <BannerCard
                banner={banners[1].guidName}
                upperTitle={banners[1].selectedText1}
                lowerTitle={banners[1].selectedText2}
                buttonText={banners[1].selectedTextButton}
              />
              <BannerCard
                banner={banners[0].guidName}
                upperTitle={banners[0].selectedText1}
                lowerTitle={banners[0].selectedText2}
                buttonText={banners[0].selectedTextButton}
              />
              <BannerCard
                banner={banners[2].guidName}
                upperTitle={banners[2].selectedText1}
                lowerTitle={banners[2].selectedText2}
                buttonText={banners[2].selectedTextButton}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default memo(IntroBanners);
