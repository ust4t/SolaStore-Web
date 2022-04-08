import React from "react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import menuJSON from "../../public/menuData.json";
// import Shop from "../../src/layout/Shop";
import ProductCategory from "../../src/layout/ProductCategory";

export default function ShopPage({
  catData,
  brandData,
  title,
  id,
  page,
  count,
  mostViewed,
}) {
  const router = useRouter();
  const { t } = useTranslation("common");
  const menu = useSelector((state) => state.menu.menuData);
  const flatMenu = (menu || menuJSON[router.locale]).reduce((acc, curr) => {
    acc.push(curr);
    if (curr.subcategories) {
      curr.subcategories.forEach((sub) => {
        acc.push(sub);
      });
    }
    return acc;
  }, []);
  const dynamicTitle = flatMenu.find(
    (item) => item.categoryID === Number(id)
  ).selectedCategoryName;
  return (
    // <Shop
    //   allProducts={catData}
    //   titleHead={`Sola Store | ${title.toUpperCase()}`}
    //   title={title.toUpperCase()}
    //   share={true}
    //   shareDetails={{
    //     data: {
    //       url: `https://www.solastore.com.tr/shop/`,
    //       name: title,
    //       id,
    //     },
    //     title: t("shareCat"),
    //   }}
    //   full
    //   filterDropdown
    //   brands={brandData}
    // />
    <ProductCategory
      allProducts={catData}
      titleHead={`Sola Store | ${dynamicTitle.toUpperCase()}`}
      title={dynamicTitle.toUpperCase()}
      share={true}
      shareDetails={{
        data: {
          url: `https://www.solastore.com.tr/shop/`,
          name: title,
          id,
        },
        title: t("shareCat"),
      }}
      full
      filterDropdown
      brands={brandData}
      selectedPage={page}
      count={count}
      catRoute={router.query.catId}
      showMostViewed={false}
      mostViewed={mostViewed}
    />
  );
}

export async function getServerSideProps({ query, locale }) {
  const { catId, page, pageSize } = query;
  const title = catId.slice(0, catId.indexOf(":")).replace("-", " ");
  const id = catId.slice(catId.indexOf(":") + 1);

  const [{ data: catData }, { data: brandData }, { data: mostViewed }] =
    await Promise.all([
      axios.get(
        `https://api.solastore.com.tr/api/Product/GetAllByCategoryIDNew?id=${id}&lang=${locale}&pageNumber=${
          page || 1
        }&pageSize=${pageSize || 20}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      axios.get(
        `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
      ),
      axios.get(
        `https://api.solastore.com.tr/api/Product/GetMostViewedProducts?sourceProof=${process.env.SOURCE_PROOF}`
      ),
    ]);

  return {
    props: {
      catData: catData.item1,
      brandData: brandData,
      title,
      id,
      page: page || 1,
      count: catData.count,
      mostViewed,
    },
  };
}
