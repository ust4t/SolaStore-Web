import React, { memo, useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

import Loader from "../../Loader";
import sources from "../../../../sources";
import Link from "next/link";
import styles from "./IntroBanners.module.css";

const fetchBanners = async () => {
  const { data } = await axios.get("/api/getBanners");
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
        <Box
          sx={{ width: "100%", minHeight: 829 }}
          p={{
            xs: 3,
            md: 5,
            lg: 15,
          }}>
          <Masonry columns={2} spacing={2}>
            {banners.map(
              (
                {
                  pictureID,
                  guidName,
                  selectedText1,
                  selectedText2,
                  selectedTextButton,
                },
                index
              ) => (
                <Link href="/blog">
                  <Stack
                    sx={{
                      cursor: "pointer",
                    }}
                    position="relative"
                    key={pictureID}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        color: "#fff",
                        display: "flex",
                        textAlign: "left",
                        gap: "10px",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        width: "85%",
                        height: "85%",
                        border: ".5rem solid rgba(255,255,255,.3)",
                        transform: "translate(-50%, -50%)",
                        transition: "all .3s ease-in-out",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,.3)",
                        },
                      }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#fff",
                          textShadow: "1px 1px #000000",
                        }}
                        color="#fff">
                        {selectedText1}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "#fff",
                          textShadow: "1px 1px #000000",
                        }}
                        color="#fff">
                        {selectedText2}
                      </Typography>
                      <Typography
                        variant="button"
                        sx={{
                          color: "#fff",
                          textShadow: "1px 1px #000000",
                          transition: "all .3s ease-in-out",
                          borderBottom: "1.5px solid transparent",
                          "&:hover": {
                            color: "#c96c6c",
                            borderColor: "#c96c6c",
                          },
                        }}>
                        {selectedTextButton}→
                      </Typography>
                    </Box>

                    <img
                      src={`${sources.banners}${guidName}`}
                      alt={""}
                      loading="lazy"
                    />
                  </Stack>
                </Link>
              )
            )}
          </Masonry>
        </Box>
      )}
    </>
  );
}
export default memo(IntroBanners);
