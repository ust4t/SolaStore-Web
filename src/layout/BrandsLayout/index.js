import React, { useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";
import Link from "next/link";

import Loader from "../../components/Loader";
import sources from "../../../sources";

const fetchBrands = async () => {
  const { data } = await axios.get(`/api/advertisement/getBrands`);
  return data;
};

export default function BrandsLayout() {
  const [brands, setBrands] = useState([]);
  const { isLoading, error } = useQuery("brands", fetchBrands, {
    onSuccess: ({ data }) => {
      setBrands(data);
    },
  });

  return (
    <Box
      pt={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Typography
        fontWeight="bold"
        textAlign="center"
        variant="h4"
        component="h1"
        gutterBottom>
        Markalar
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid
          alignItems="center"
          justifyContent="center"
          container
          py={7}
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          {brands.map(({ brandID, guidName, brandName }) => (
            <Grid
              display="flex"
              alignItems="center"
              justifyContent="center"
              item
              xs={12}
              sm={3}
              lg={2}
              key={brandID}>
              <Link href="/shop">
                <img
                  style={{
                    cursor: "pointer",
                  }}
                  src={`${sources.brand}${guidName}`}
                  alt={brandName}
                  loading="lazy"
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
