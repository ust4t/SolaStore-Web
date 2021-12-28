import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { getMenu } from "../../redux/action/menu";
import SubCategory from "./SubCategory";

const SubMenu = ({
    menu,
    getMenu,
    id
}) => {

    useEffect(() => {
        getMenu()
    }, [])

    console.log("menu",menu)
    return (
        <ul>
            {menu && menu.data.map(({selectedCategoryName,categoryID},i)=>(
                <li key={`${i}_*_${i}`} >
                <Link href="/index-2">
                  <a>{selectedCategoryName}</a>
                </Link>
                <SubCategory id={categoryID} />
                {/* <ul className="submenu submenu-two">
                  
                <li>
                <Link href="/index-2">
                  <a>Menu</a>
                </Link>
                </li>
                </ul> */}
              </li>
            ))}
            {/* <li>
              <Link href="/index-2">
                <a>Home Style 2</a>
              </Link>
            </li>
            <li>
              <Link href="/index-3">
                <a>Home Style 3</a>
              </Link>
            </li>
            <li>
              <Link href="/index-4">
                <a>Home Style 4</a>
              </Link>
            </li>
            <li>
              <Link href="/index-5">
                <a>Home Style 5</a>
              </Link>
            </li> */}
          </ul>
    )
}

const mapStateToProps = (state) => ({
    menu: state.menu.menuData
})

export default connect(mapStateToProps,{getMenu})(SubMenu)