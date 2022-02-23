import React from "react";
import Link from "next/link";

import { encodeURLString } from "../../utils/utils";

function InnerMobileMenu({ subcategories, allItems }) {
  return (
    <ul className="submenu submenu-three mm-collapse">
      <li>
        <Link href={`/shop/${encodeURLString(allItems.name)}:${allItems.id}`}>
          <a className="text-uppercase">Tüm Ürünler</a>
        </Link>
      </li>
      {subcategories &&
        subcategories.map(({ categoryID, selectedCategoryName }) => (
          <li key={`${categoryID}_?9`}>
            <Link
              href={`/shop/${encodeURLString(
                selectedCategoryName
              )}:${categoryID}`}>
              <a>{selectedCategoryName}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default InnerMobileMenu;
