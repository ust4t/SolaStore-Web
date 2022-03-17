import Link from "next/link";
import { connect } from "react-redux";
import { encodeURLString } from "../../utils/utils";
import SubCategory from "./SubCategory";

const SubMenu = ({ menu }) => {
  return (
    <ul>
      {menu ? (
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
            <li tabIndex={1} key={`${i}_*_${i}`}>
              <Link
                href={`/shop/${encodeURLString(
                  selectedCategoryName
                )}:${categoryID}`}>
                <a>{selectedCategoryName}</a>
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
        )
      ) : (
        <>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <li
                key={`${i}_*_${i}`}
                style={{
                  backgroundColor: "#ccc",
                  padding: "10px 30px",
                  borderRadius: "3px",
                }}
              />
            ))}
        </>
      )}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  menu: state.menu.menuData,
});

export default connect(mapStateToProps)(SubMenu);
