import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import sources from "../../../sources";

function SubCategory({ picture, subMenuData }) {
  return (
    <ul className="submenu submenu-two">
      <ul
        style={{
          minWidth: "420px",
          minHeight: "270px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            minWidth: "175px",
          }}>
          {!!subMenuData &&
            subMenuData.map(({ selectedCategoryName, categoryID }, i) => (
              <li key={`${i}_0_${i}`}>
                <Link href={`/shop/${categoryID}`}>
                  <a className="text-uppercase">{selectedCategoryName}</a>
                </Link>
              </li>
            ))}
        </div>
        <Image
          src={`${sources.imageMidSrc}${picture}`}
          width={400}
          height={600}
          layout="intrinsic"
          priority={true}
        />
      </ul>
    </ul>
  );
}

export default SubCategory;
