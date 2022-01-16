import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "react-query";
import Link from "next/link";
import Image from "next/image";

import Loader from "../../components/Loader";
import sources from "../../../sources";

export default function Categories({ categories }) {
  return (
    <div className="container py-1">
      <div className="row justify-content-center align-items-center">
        {categories.map(
          (
            { mainCampaignName, pictureGuidName, campaignID, pictureLink },
            i
          ) => (
            <div className="col-6 col-md-4 pb-3" key={`${campaignID}_*0${i}`}>
              <Link href={`/shop/${pictureLink.replace(/[^0-9.]/g, "")}`}>
                <Image
                  src={`${sources.campaign}${pictureGuidName}`}
                  alt={mainCampaignName}
                  className="cursor-pointer"
                  width={250}
                  height={300}
                  layout="responsive"
                  quality={50}
                  placeholder="blur"
                  blurDataURL="/img/loadingImg.jpg"
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
