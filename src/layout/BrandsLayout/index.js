import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import Loader from "../../components/Loader";
import sources from "../../../sources";

export default function BrandsLayout() {
  const brands = useSelector((state) => state.brands.brands);

  return (
    <div className="container py-md-2 pt-md-4">
      <div className="row">
        <h4 className="fw-bold fs-1 text-center">Markalar</h4>
      </div>
      <div className="row py-3">
        {!brands ? (
          <Loader />
        ) : (
          brands.map(({ brandID, guidName, brandName }, i) => (
            <div
              key={`${brandID}_|*_${i}`}
              className="col-4 col-lg-2 py-3 px-sm-3 brandborder">
              <Image
                src={`${sources.brand}${guidName}`}
                alt={brandName}
                className="cursor-pointer"
                width={95}
                height={80}
                layout="responsive"
                quality={60}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
