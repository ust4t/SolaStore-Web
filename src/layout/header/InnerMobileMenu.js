import React from "react";
import Link from "next/link";

function InnerMobileMenu({ subcategories }) {
  return (
    <ul className="submenu submenu-three mm-collapse">
      {subcategories &&
        subcategories.map(({ categoryID, selectedCategoryName }) => (
          <li key={categoryID}>
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
