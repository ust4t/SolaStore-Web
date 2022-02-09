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
              squareCategoryPicture,
              subCategoriesList,
            },
            i
          ) => (
            <li key={`${i}_*_${i}`}>
              <Link
                href={`/shop/${selectedCategoryName.replace(
                  " ",
                  "-"
                )}:${categoryID}`}>
                <a onClick={() => changeTitle(selectedCategoryName)}>
                  {selectedCategoryName}
                </a>
              </Link>
              <SubCategory
                parentCategory={{
                  name: selectedCategoryName,
                  id: categoryID,
                }}
                subMenuData={subCategoriesList}
                picture={squareCategoryPicture[0].guidName}
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
