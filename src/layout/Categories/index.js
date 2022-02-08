import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";

import sources from "../../../sources";

export default function Categories({ categories }) {
  const menu = useSelector((state) => state.menu.menuData);
  // flatten the menu
  const flatMenu =
    menu &&
    menu.reduce((acc, curr) => {
      acc.push(curr);
      if (curr.subcategories) {
        curr.subcategories.forEach((sub) => {
          acc.push(sub);
        });
      }
      return acc;
    }, []);

  const findCat = (id) =>
    flatMenu
      ? flatMenu
          .map((cat) =>
            cat.categoryID === id ? cat.selectedCategoryName : null
          )
          .filter(Boolean)[0]
      : "";

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
                href={`/shop/${findCat(
                  Number(pictureLink.slice(pictureLink.indexOf("x/") + 2))
                )}:${pictureLink.replace(/[^0-9.]/g, "")}`}>
                <Image
                  src={`${sources.campaign}${pictureGuidName}`}
                  alt={mainCampaignName}
                  className="cursor-pointer"
                  width={250}
                  height={300}
                  layout="responsive"
                  quality={50}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
