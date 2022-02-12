import React from "react";
import Link from "next/link";

import sources from "../../../sources";
import {
  banner,
  megamenu,
  banner_content,
  overlay,
  title,
  year,
} from "./SubCategory.module.css";

function SubCategory({ picture, subMenuData, parentCategory }) {
  // return (
  //   <ul className="submenu submenu-two">
  //     <div className="row no-gutters justify-content-center">
  //       <div className="col-8">
  //         <ul>
  //           {!!subMenuData &&
  //             subMenuData.map(
  //               ({ selectedSubCategoryName, subCategoryID }, i) => (
  //                 <li
  //                   className={megamenu}
  //                   key={`${i}_0_${i}`}
  //                   // onClick={() => changeTitle(selectedSubCategoryName)}
  //                 >
  //                   <Link
  //                     href={`/shop/${selectedSubCategoryName.replace(
  //                       " ",
  //                       "-"
  //                     )}:${subCategoryID}`}>
  //                     <a className="text-uppercase">
  //                       {selectedSubCategoryName}
  //                     </a>
  //                   </Link>
  //                 </li>
  //               )
  //             )}
  //         </ul>
  //       </div>
  //       {picture !== null && (
  //         <div className="col-3">
  //           <div className={`${banner} position-relative`}>
  //             <Link
  //               href={`/shop/${parentCategory.name.replace(" ", "-")}:${
  //                 parentCategory.id
  //               }`}>
  //               <a>
  //                 <img
  //                   src={`${sources.imageMaxSrc}${picture}`}
  //                   alt={parentCategory.name}
  //                   loading="lazy"
  //                 />
  //                 <div className={overlay} />
  //               </a>
  //             </Link>
  //             <div className={banner_content}>
  //               <p className={title}>{parentCategory.name}</p>
  //               <p className={year}>{new Date().getFullYear()}</p>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   </ul>
  // );
  return (
    <ul className="submenu submenu-two">
      <div className="row no-gutters justify-content-center">
        <div className="col-8">
          <ul>
            {!!subMenuData &&
              subMenuData.map(({ selectedCategoryName, categoryID }, i) => (
                <li className={megamenu} key={`${i}_0_${i}`}>
                  <Link
                    href={`/shop/${selectedCategoryName
                      .toLowerCase()
                      .replace(" ", "-")}:${categoryID}`}>
                    <a className="text-uppercase">{selectedCategoryName}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        {picture !== null && (
          <div className="col-3">
            <div className={`${banner} position-relative`}>
              <Link
                href={`/shop/${parentCategory.name.replace(" ", "-")}:${
                  parentCategory.id
                }`}>
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
        )}
      </div>
    </ul>
  );
}

export default SubCategory;
