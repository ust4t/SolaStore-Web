import SubMenu from "./SubMenu";
import Link from "next/link";

const Menu = () => {
  return (
    <nav id="mobile-menu-four">
      <ul>
        <li>
          <Link href="/">
            <a>ANASAYFA</a>
          </Link>
        </li>
        <li>
          <Link href="/shop/brandlist">
            <a>MARKALAR</a>
          </Link>
        </li>
        <li>
          <SubMenu />
        </li>
        <li>
          <Link href="/">
            <a>İLETİŞİM</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
