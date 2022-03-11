import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BRAND,
  FILTER_CAT,
  FILTER_PRICE,
} from "../../../redux/action/type";

import SelectCheckbox from "../../form/SelectCheckbox";
import SelectCheckboxGroup from "../../form/SelectCheckboxGroup";
import SelectOptions from "../../form/SelectOptions";
import PriceFilter from "./PriceFilter";

export default function FilterDropdown({
  brands,
  setPageLimit,
  pageLimit,
  setActive_,
}) {
  const { t } = useTranslation("common");
  const { menu, filter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { push } = useRouter();
  const [price, setPrice] = useState({
    min: filter.price.min,
    max: filter.price.max,
  });
  const isMounted = useRef(false);

  // const [filterData, setFilterData] = useState({
  //   category: [],
  //   brand: [],
  //   price: "",
  // });

  useEffect(() => {
    if (isMounted.current) {
      push(
        {
          pathname: "/filter",
          query: {
            categoryIds: filter.category.join(","),
            brandIds: filter.brand.join(","),
            searchPrice: `${filter.price.min}-${filter.price.max}`,
          },
        },
        null,
        { scroll: false }
      );
    } else isMounted.current = true;
  }, [filter]);

  const showNum = [
    {
      brandName: "10",
      brandID: "10",
    },
    {
      brandName: "20",
      brandID: "20",
    },
    {
      brandName: "30",
      brandID: "30",
    },
    {
      brandName: "50",
      brandID: "50",
    },
  ];

  const handleFilterBrand = (e, value) => {
    if (e.target.checked) {
      dispatch({
        type: FILTER_BRAND,
        payload: [
          ...filter.brand,
          !filter.brand.includes(value) ? value : null,
        ],
      });
    } else {
      dispatch({
        type: FILTER_BRAND,
        payload: filter.brand.filter((item) => item !== value),
      });
    }
  };

  const handleFilterCategoryParent = (e, allCats) => {
    if (e.target.checked) {
      dispatch({
        type: FILTER_CAT,
        payload: [
          ...filter.category.filter((cat) => !allCats.includes(cat)),
          ...allCats,
        ].flat(),
      });
    } else {
      dispatch({
        type: FILTER_CAT,
        payload: filter.category.filter((item) => !allCats.includes(item)),
      });
    }
  };

  const handleFilterCategoryChild = (e, value) => {
    if (e.target.checked) {
      dispatch({
        type: FILTER_CAT,
        payload: [...filter.category, value],
      });
    } else {
      dispatch({
        type: FILTER_CAT,
        payload: filter.category.filter((item) => item !== value),
      });
    }
  };

  const handlePriceSlider = ({ min, max }) => {
    dispatch({
      type: FILTER_PRICE,
      payload: {
        min,
        max,
      },
    });
  };

  const handlePageLimit = (value) => setPageLimit(value);

  return (
    <div className="row justify-content-space-evenly align-items-end my-20">
      <div className="col-xs-12 col-md-4 col-lg-3 py-3">
        {menu.menuData ? (
          <SelectCheckboxGroup
            filterData={filter.category}
            data={menu.menuData}
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
        {brands ? (
          <SelectCheckbox
            filterData={filter.brand}
            data={brands}
            title={t("menu.brands")}
            onSelect={handleFilterBrand}
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
      <div className="col-xs-12 col-md-2 col-xl-3 py-3">
        <SelectOptions
          selectedData={pageLimit}
          data={showNum}
          title="Göster"
          onSelect={handlePageLimit}
        />
      </div>
      <div className="col-xs-12 col-md-2 col-xl-3 py-3">
        <h5 className="fs-4 text-center fw-bold">{t("price")}</h5>
        <PriceFilter
          filterByPrice={handlePriceSlider}
          setActive_={setActive_}
          value={price}
          onChange={setPrice}
        />
      </div>
    </div>
  );
}
