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
    <div className="container py-md-2 pt-md-4">
      <div className="row">
        <h4 className="fw-bold fs-1 text-center">Markalar</h4>
      </div>
      <div className="row py-3">
        {isLoading ? (
          <Loader />
        ) : (
          brands.map(({ brandID, guidName, brandName }, i) => (
            <div
              key={`${brandID}_|*_${i}`}
              className="col-4 col-lg-2 py-3 px-sm-3 brandborder">
              <img
                src={`${sources.brand}${guidName}`}
                alt={brandName}
                className="w-100 cursor-pointer"
                loading="lazy"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
