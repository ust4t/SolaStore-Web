import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSubMenu } from "../../redux/action/menu";
import Link from "next/link";
import axios from "axios";

function SubCategory({ subMenu, getSubMenu, id }) {
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
    <>
      <ul className="submenu submenu-two">
        {!!categoryData.data &&
          categoryData.data.map(({ selectedCategoryName, categoryID }, i) => (
            <li key={`${i}_0_${i}`}>
              <Link href="#">
                <a onClick={() => handleGetID(categoryID)}>
                  {selectedCategoryName}
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </>
  );
}

const mapStateToProps = (state) => ({
  subMenu: state.menu.subMenuData,
});

export default connect(mapStateToProps, { getSubMenu })(SubCategory);
