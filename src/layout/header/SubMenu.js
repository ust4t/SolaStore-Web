import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getMenu } from "../../redux/action/menu";
import SubCategory from "./SubCategory";

const SubMenu = ({ menu, getMenu }) => {
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
              <Link href={`/shop/${categoryID}`}>
                <a>{selectedCategoryName}</a>
              </Link>
              <SubCategory
                subMenuData={subcategories}
                // id={categoryID}
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

export default connect(mapStateToProps, { getMenu })(SubMenu);
