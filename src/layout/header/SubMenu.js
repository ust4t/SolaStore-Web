import Link from "next/link";
import { SET_TITLE } from "../../redux/action/type";
import { connect, useDispatch } from "react-redux";
import SubCategory from "./SubCategory";

const SubMenu = ({ menu }) => {
  const dispatch = useDispatch();

  const changeTitle = (title) => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    });
  };

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
                <a onClick={() => changeTitle(selectedCategoryName)}>
                  {selectedCategoryName}
                </a>
              </Link>
              <SubCategory
                parentCategory={{
                  name: selectedCategoryName,
                  id: categoryID,
                }}
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
