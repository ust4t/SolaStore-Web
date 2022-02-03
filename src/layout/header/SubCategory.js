import React from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Image from "next/image";

import sources from "../../../sources";
import { SET_TITLE } from "../../redux/action/type";
import {
  banner,
  megamenu,
  banner_content,
  overlay,
  title,
  year,
} from "./SubCategory.module.css";

function SubCategory({ picture, subMenuData, parentCategory }) {
  const dispatch = useDispatch();

  const changeTitle = (title) => {
    dispatch({
      type: SET_TITLE,
      payload: title,
    });
  };

  return (
    <ul className="submenu submenu-two">
      <div className="row no-gutters justify-content-center">
        <div className="col-8">
          <ul>
            {!!subMenuData &&
              subMenuData.map(({ selectedCategoryName, categoryID }, i) => (
                <li
                  className={megamenu}
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
          </ul>
        </div>
        <div className="col-3">
          <div className={`${banner} position-relative`}>
            <Link
              href={{
                pathname: "/shop",
                query: {
                  categoryIds: parentCategory.id,
                  brandIds: "",
                  searchPrice: "",
                },
              }}>
              <a>
                <img
                  src={`${sources.imageMidSrc}${picture}`}
                  alt={parentCategory.name}
                  loading="lazy"
                />
                <div className={overlay} />
              </a>
            </Link>
            <div className={banner_content}>
              <p className={title}>{parentCategory.name}</p>
              <p className={year}>{new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </div>
    </ul>
  );
}

export default SubCategory;
