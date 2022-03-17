import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import SubMenu from "./SubMenu";

const Menu = () => {
  const { t } = useTranslation("common");
  return (
    <nav id="mobile-menu-four">
      <ul>
        <li tabIndex={1}>
          <Link href="/">
            <a className="text-uppercase">{t("menu.home")}</a>
          </Link>
        </li>
        <li tabIndex={1}>
          <Link href="/shop/brandlist">
            <a className="text-uppercase">{t("menu.brands")}</a>
          </Link>
        </li>
        <li
          tabIndex={1}
          style={{
            background: "var(--color-primary)",
          }}>
          <Link href="/shop/newproducts">
            <a className="no-hover px-2 text-white text-uppercase">
              {t("home:new")}
            </a>
          </Link>
        </li>
        <li className="p-0">
          <SubMenu />
        </li>
        <li tabIndex={1}>
          <Link href="/contact">
            <a className="text-uppercase">{t("menu.contact")}</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
