import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getSubMenu } from "../../redux/action/menu";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

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
    <ul
      className="submenu submenu-two"
      style={{
        width: "400px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <ul>
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
      <Image
        src={`https://solastore.com.tr/img/ProductWM/maxPic/${picture}`}
        layout="intrinsic"
        width={200}
        height={200}
      />
    </ul>
  );
}

const mapStateToProps = (state) => ({
  subMenu: state.menu.subMenuData,
});

export default connect(mapStateToProps, { getSubMenu })(SubCategory);
