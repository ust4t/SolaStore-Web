import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSelector } from "react-redux";

function InnerMobileMenu({ menuId, subcategories }) {
  // const lang = useSelector((state) => state.lang.lang);
  // const [categoryData, setCategoryData] = useState({
  //   data: [],
  // });

  // useEffect(() => {
  //   axios
  //     .get(`/api/getSubMenu?id=${menuId}&lang=${lang}`)
  //     .then((res) => setCategoryData(res.data));
  // }, [menuId]);

  return (
    <ul className="submenu submenu-three mm-collapse">
      {subcategories &&
        subcategories.map(({ categoryID, selectedCategoryName }) => (
          <li key={categoryID}>
            <Link href={`/shop/${categoryID}`}>
              <a>{selectedCategoryName}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default InnerMobileMenu;
