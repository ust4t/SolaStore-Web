import React from "react";
import Link from "next/link";

function InnerMobileMenu({ subcategories, allItems }) {
  return (
    <ul className="submenu submenu-three mm-collapse">
      <li>
        <Link
          href={{
            pathname: "/shop",
            query: {
              categoryIds: allItems,
              brandIds: "",
              searchPrice: "",
            },
          }}>
          <a className="text-uppercase">Tüm Ürünler</a>
        </Link>
      </li>
      {subcategories &&
        subcategories.map(({ categoryID, selectedCategoryName }) => (
          <li key={`${categoryID}_?9`}>
            <Link
              href={{
                pathname: "/shop",
                query: {
                  categoryIds: categoryID,
                  brandIds: "",
                  searchPrice: "",
                },
              }}>
              <a>{selectedCategoryName}</a>
            </Link>
          </li>
        ))}
    </ul>
  );
}

export default InnerMobileMenu;
