import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import SubMenu from "./SubMenu";

const Menu = () => {
  const { t } = useTranslation("common");
  return (
    <nav id="mobile-menu-four">
      <ul>
        <li>
          <Link href="/">
            <a className="text-uppercase">{t("menu.home")}</a>
          </Link>
        </li>
        <li>
          <Link href="/shop/brandlist">
            <a className="text-uppercase">{t("menu.brands")}</a>
          </Link>
        </li>
        <li>
          <SubMenu />
        </li>
        <li>
          <Link href="/contact">
            <a className="text-uppercase">{t("menu.contact")}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
