import React from "react";
import Link from "next/link";

function InnerMobileMenu({ subcategories, allItems }) {
  return (
    <ul className="submenu submenu-three mm-collapse">
      <li>
        <Link href={`/shop/${allItems.name.replace(" ", "-")}:${allItems.id}`}>
          <a className="text-uppercase">Tüm Ürünler</a>
        </Link>
      </li>
      {subcategories &&
        subcategories.map(({ categoryID, selectedCategoryName }) => (
          <li key={`${categoryID}_?9`}>
            <Link
              href={`/shop/${selectedCategoryName.replace(
                " ",
                "-"
              )}:${categoryID}`}>
              <a>{selectedCategoryName}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default InnerMobileMenu;
