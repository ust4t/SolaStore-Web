import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import sources from "../../../sources";

function SubCategory({ picture, subMenuData }) {
  // const lang = useSelector((state) => state.lang.lang);
  // const [categoryData, setCategoryData] = useState({
  //   data: [],
  // });

  // useEffect(() => {
  //   axios
  //     .get(`/api/getSubMenu?id=${id}&lang=${lang}`)
  //     .then((res) => setCategoryData(res.data));
  // }, [id]);

  return (
    <ul className="submenu submenu-two">
      <ul
        style={{
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
        <img
          src={`${sources.imageMidSrc}${picture}`}
          style={{
            maxWidth: "280px",
          }}
        />
      </ul>
    </ul>
  );
}

export default SubCategory;
