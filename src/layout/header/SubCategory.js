import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSubMenu } from "../../redux/action/menu";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import sources from "../../../sources";

function SubCategory({ subMenu, picture, id }) {
  const [categoryData, setCategoryData] = useState({
    data: [],
  });

  useEffect(() => {
    axios
      .get(`/api/getSubMenu?id=${id}`)
      .then((res) => setCategoryData(res.data));
  }, [id]);

  const handleGetID = (id) => {
    alert(id);
  };

  return (
    <ul className="submenu submenu-two">
      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            minWidth: "175px",
          }}>
          {!!categoryData.data &&
            categoryData.data.map(({ selectedCategoryName, categoryID }, i) => (
              <li key={`${i}_0_${i}`}>
                <Link href="#">
                  <a
                    onClick={() => handleGetID(categoryID)}
                    className="text-uppercase">
                    {selectedCategoryName}
                  </a>
                </Link>
              </li>
            ))}
        </div>
        <img
          src={`${sources.imageMidSrc}${picture}`}
          style={{
            maxWidth: "280px",
          }}
        />
      </ul>
    </ul>
  );
}

const mapStateToProps = (state) => ({
  subMenu: state.menu.subMenuData,
});

export default connect(mapStateToProps, { getSubMenu })(SubCategory);
