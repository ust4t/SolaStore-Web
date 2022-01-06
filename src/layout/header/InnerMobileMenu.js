import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

function InnerMobileMenu({ menuId }) {
  const [categoryData, setCategoryData] = useState({
    data: [],
  });

  useEffect(() => {
    axios
      .get(`/api/getSubMenu?id=${menuId}`)
      .then((res) => setCategoryData(res.data));
  }, [menuId]);

  return (
    <ul className="submenu submenu-three mm-collapse">
      {categoryData &&
        categoryData.data.map(({ categoryID, selectedCategoryName }) => (
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
