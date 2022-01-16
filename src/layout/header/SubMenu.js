import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import SubCategory from "./SubCategory";

const SubMenu = ({ menu }) => {
  return (
    <ul>
      {menu &&
        menu.map(
          (
            {
              selectedCategoryName,
              categoryID,
              squareCategoryPictureGuidName,
              subcategories,
            },
            i
          ) => (
            <li key={`${i}_*_${i}`}>
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
              <SubCategory
                subMenuData={subcategories}
                picture={squareCategoryPictureGuidName}
              />
            </li>
          )
        )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu.menuData,
});

export default connect(mapStateToProps)(SubMenu);
