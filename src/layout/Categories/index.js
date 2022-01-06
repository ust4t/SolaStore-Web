import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Link from "next/link";

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
    <div className="container py-4">
      <div className="row justify-content-center align-items-center">
        {isLoading ? (
          <Loader />
        ) : (
          categories.map(
            ({ mainCampaignName, pictureGuidName, campaignID }, i) => (
              <div className="col-6 col-md-4 pb-3" key={`${campaignID}_*0${i}`}>
                <Link href="/">
                  <img
                    src={`${sources.campaign}${pictureGuidName}`}
                    alt={mainCampaignName}
                    className="w-100 cursor-pointer"
                    loading="lazy"
                  />
                </Link>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}
