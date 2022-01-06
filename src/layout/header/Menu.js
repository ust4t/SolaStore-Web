import { useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { getMenu } from "../../redux/action/menu";
import SubMenu from "./SubMenu";

const Menu = () => {
  return (
    <nav id="mobile-menu-four">
      <ul>
        <SubMenu />
      </ul>
    </nav>
  );
};

export default Menu;
