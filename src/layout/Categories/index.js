import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import Link from "next/link";
import Image from "next/image";

import Loader from "../../components/Loader";
import sources from "../../../sources";

const fetchCategories = async (lang) => {
  const { data } = await axios.get(
    `/api/advertisement/getCategories?lang=${lang}`
  );
  return data;
};

const chooseLang = (lang) => {
  switch (lang) {
    case "tr":
      return 1;
    case "en":
      return 2;
    case "fr":
      return 3;
    case "ar":
      return 4;
    default:
      return 5;
  }
};

export default function Categories() {
  const lang = useSelector((state) => state.lang.lang);
  const [categories, setCategories] = useState([]);
  const catLang = chooseLang(lang);
  const { isLoading, error } = useQuery(
    "categories",
    () => fetchCategories(catLang),
    {
      onSuccess: ({ data }) => {
        setCategories(data);
      },
    }
  );

  return (
    <div className="container py-1">
      <div className="row justify-content-center align-items-center">
        {isLoading ? (
          <Loader />
        ) : (
          categories.map(
            ({ mainCampaignName, pictureGuidName, campaignID }, i) => (
              <div className="col-6 col-md-4 pb-3" key={`${campaignID}_*0${i}`}>
                <Link href="/">
                  <Image
                    src={`${sources.campaign}${pictureGuidName}`}
                    alt={mainCampaignName}
                    className="cursor-pointer"
                    width={250}
                    height={300}
                    layout="responsive"
                    quality={50}
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
