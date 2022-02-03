import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import sources from "../../../sources";
import { SET_TITLE } from "../../redux/action/type";

function SubCategory({ picture, subMenuData }) {
  const dispatch = useDispatch();

  const changeTitle = (title) => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    });
  };

  return (
    <ul className="submenu submenu-two">
      <ul
        style={{
          minWidth: "420px",
          minHeight: "270px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            minWidth: "175px",
          }}>
          {!!subMenuData &&
            subMenuData.map(({ selectedCategoryName, categoryID }, i) => (
              <li
                key={`${i}_0_${i}`}
                onClick={() => changeTitle(selectedCategoryName)}>
                <Link
                  href={{
                    pathname: "/shop",
                    query: {
                      categoryIds: categoryID,
                      brandIds: "",
                      searchPrice: "",
                    },
                  }}>
                  <a className="text-uppercase">{selectedCategoryName}</a>
                </Link>
              </li>
            ))}
        </div>
        <Image
          src={`${sources.imageMidSrc}${picture}`}
          width={400}
          height={600}
          layout="intrinsic"
          priority={true}
        />
      </ul>
    </ul>
  );
}

export default SubCategory;
