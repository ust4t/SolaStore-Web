import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import { brandborder } from "./BrandsLayout.module.css";
import sources from "../../../sources";

export default function BrandsLayout({ brands }) {
  const { t } = useTranslation("common");
  return (
    <div className="container py-md-2 pt-md-4">
      <div className="row">
        <h4 className="fw-bold fs-1 text-center">{t("menu.brands")}</h4>
      </div>
      <div className="row py-3">
        {brands.map(({ brandID, guidName, brandName }, i) => (
          <div
            key={`${brandID}_|*_${i}`}
            className={`col-4 col-lg-2 py-3 px-sm-3 ${brandborder}`}>
            <Link href={`/brands/${brandName.replace(" ", "-")}:${brandID}`}>
              <Image
                src={`${sources.brand}${guidName}`}
                alt={brandName}
                className="cursor-pointer"
                width={95}
                height={80}
                layout="responsive"
                quality={60}
                placeholder="blur"
                blurDataURL="/img/placeholder.jpg"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
