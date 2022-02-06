import React from "react";
import Link from "next/link";
import Image from "next/image";

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
              <Link
                href={{
                  pathname: "/shop",
                  query: {
                    categoryIds: pictureLink.replace(/[^0-9.]/g, ""),
                    brandIds: "",
                    searchPrice: "",
                  },
                }}>
                <Image
                  src={`${sources.campaign}${pictureGuidName}`}
                  alt={mainCampaignName}
                  className="cursor-pointer"
                  width={250}
                  height={300}
                  layout="responsive"
                  quality={50}
                  placeholder="blur"
                  blurDataURL="/img/placeholder.jpg"
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
