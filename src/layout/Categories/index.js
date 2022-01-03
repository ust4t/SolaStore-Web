import React, { useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import { useQuery } from "react-query";
import Link from "next/link";
import Image from "next/image";

import Loader from "../../components/Loader";
import sources from "../../../sources";

const fetchCategories = async () => {
  const { data } = await axios.get("/api/advertisement/getCategories");
  return data;
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const { isLoading, error } = useQuery("categories", fetchCategories, {
    onSuccess: ({ data }) => {
      setCategories(data);
    },
  });

  return (
    <Grid
      mb={7}
      alignItems="center"
      justifyContent="center"
      container
      spacing={{ xs: 3, md: 3 }}>
      {isLoading ? (
        <Loader />
      ) : (
        categories.map(({ mainCampaignName, pictureGuidName, campaignID }) => (
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="center"
            item
            xs={12}
            sm={6}
            md={4}
            key={campaignID}>
            <Link href="/shop">
              <img
                style={{
                  cursor: "pointer",
                }}
                src={`${sources.campaign}${pictureGuidName}`}
                alt={mainCampaignName}
                className="img-fluid"
                layout="fill"
                loading="lazy"
              />
            </Link>
          </Grid>
        ))
      )}
    </Grid>
  );
}
