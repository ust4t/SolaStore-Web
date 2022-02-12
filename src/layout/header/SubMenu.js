import Link from "next/link";
import { connect } from "react-redux";
import SubCategory from "./SubCategory";

const SubMenu = ({ menu }) => {
  return (
    <ul>
      {menu ? (
        menu.map(
          (
            {
              // selectedCategoryName,
              // categoryID,
              // squareCategoryPicture,
              // subCategoriesList,
              selectedCategoryName,
              categoryID,
              squareCategoryPictureGuidName,
              subcategories,
            },
            i
          ) => (
            // <li key={`${i}_*_${i}`}>
            //   <Link
            //     href={`/shop/${selectedCategoryName.replace(
            //       " ",
            //       "-"
            //     )}:${categoryID}`}>
            //     <a onClick={() => changeTitle(selectedCategoryName)}>
            //       {selectedCategoryName}
            //     </a>
            //   </Link>
            //   <SubCategory
            //     parentCategory={{
            //       name: selectedCategoryName,
            //       id: categoryID,
            //     }}
            //     subMenuData={subCategoriesList}
            //     picture={squareCategoryPicture[0].guidName}
            //   />
            <li key={`${i}_*_${i}`}>
              <Link
                href={`/shop/${selectedCategoryName
                  .toLowerCase()
                  .replace(" ", "-")}:${categoryID}`}>
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
