import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";

import SelectCheckboxGroup from "../../components/form/SelectCheckboxGroup";
import SelectCheckbox from "../../components/form/SelectCheckbox";
import PriceFilter from "../../components/product/filter/PriceFilter";
import { SET_TITLE } from "../../redux/action/type";

export default function FilterSearch({ brands }) {
  const { t } = useTranslation("common");
  const { push } = useRouter();
  const menu = useSelector((state) => state.menu.menuData);
  const dispatch = useDispatch();

  const [filterData, setFilterData] = useState({
    category: [],
    brand: [],
    price: "",
  });

  const navigateToSearch = () => {
    dispatch({
      type: SET_TITLE,
      payload: "Search",
    });
    push({
      pathname: "/filter",
      query: {
        categoryIds: filterData.category.join(","),
        brandIds: filterData.brand.join(","),
        searchPrice: filterData.price,
      },
    });
  };

  const handleFilterBrand = (e, value) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        brand: [
          ...filterData.brand,
          !filterData.brand.includes(value) ? value : null,
        ],
      });
    } else {
      setFilterData({
        ...filterData,
        brand: filterData.brand.filter((item) => item !== value),
      });
    }
  };

  const handlePriceSelect = ({ min, max }) =>
    setFilterData({
      ...filterData,
      price: `${min}-${max}`,
    });

  // const handleFilterCategory = (e, value) => {
  //   if (e.target.checked) {
  //     setFilterData({
  //       ...filterData,
  //       category: [
  //         ...filterData.category,
  //         !filterData.category.includes(value) ? value : null,
  //       ],
  //     });
  //   } else {
  //     setFilterData({
  //       ...filterData,
  //       category: filterData.category.filter((item) => item !== value),
  //     });
  //   }
  // };

  const handleFilterCategoryParent = (e, allCats) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        category: [
          ...filterData.category.filter((cat) => !allCats.includes(cat)),
          ...allCats,
        ].flat(),
      });
    } else {
      setFilterData({
        ...filterData,
        category: filterData.category.filter((item) => !allCats.includes(item)),
      });
    }
  };

  const handleFilterCategoryChild = (e, value) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        category: [...filterData.category, value],
      });
    } else {
      setFilterData({
        ...filterData,
        category: filterData.category.filter((item) => item !== value),
      });
    }
  };

  return (
    <div className="container py-3">
      <div className="row justify-content-center align-items-end">
        <div className="col-12">
          <h2 className="text-center fw-bold">{t("home:filterTitle")}</h2>
          <h5 className="text-center">{t("home:filterDesc")}</h5>
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          {menu ? (
            <SelectCheckboxGroup
              filterData={filterData.category}
              data={menu}
              title={t("category")}
              onParentSelect={handleFilterCategoryParent}
              onChildSelect={handleFilterCategoryChild}
            />
          ) : (
            <div
              style={{
                backgroundColor: "rgb(239 239 239)",
                padding: "30px",
              }}
              className="align-items-center rounded w-100"
            />
          )}
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          <SelectCheckbox
            filterData={filterData.brand}
            data={brands}
            title={t("menu.brands")}
            onSelect={handleFilterBrand}
          />
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          <h5 className="fs-4 text-center fw-bold pb-10">{t("price")}</h5>
          <PriceFilter filterByPrice={handlePriceSelect} />
        </div>
        <div className="col-xs-12 col-lg-3 py-3 d-flex align-items-end justify-content-center h-100 rounded">
          <button
            onClick={navigateToSearch}
            className="btn btn-main text-uppercase shadow-none w-100 h-100">
            {t("choose")}
          </button>
        </div>
      </div>
    </div>
  );
}
