import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import SelectCheckbox from "../../form/SelectCheckbox";
import SelectCheckboxGroup from "../../form/SelectCheckboxGroup";
// import SelectOptions from "../../form/SelectOptions";
import PriceFilter from "./PriceFilter";

export default function FilterDropdown({
  brands,
  setPageLimit,
  pageLimit,
  setActive_,
}) {
  const { t } = useTranslation("common");
  const menu = useSelector((state) => state.menu.menuData);
  const { push, query } = useRouter();
  const isMounted = useRef(false);

  const [filterData, setFilterData] = useState({
    category: [],
    brand: [],
    price: "",
  });

  useEffect(() => {
    // if (filterData.category.length > 0 || filterData.brand.length > 0) {
    if (isMounted.current) {
      push({
        pathname: "/filter",
        query: {
          categoryIds: filterData.category.join(","),
          brandIds: filterData.brand.join(","),
          searchPrice: filterData.price,
        },
      });
    } else isMounted.current = true;
    // }
  }, [filterData]);

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
    // if (!filterData.brand.length) setFilterData({ ...filterData, brand: "" });
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

  const handleFilterCategory = (e, value) => {
    // if (!filterData.category.length)
    //   setFilterData({ ...filterData, category: "" });
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        category: [
          ...filterData.category,
          !filterData.category.includes(value) ? value : null,
        ],
      });
    } else {
      setFilterData({
        ...filterData,
        category: filterData.category.filter((item) => item !== value),
      });
    }
  };

  const handlePriceSlider = ({ min, max }) => {
    setFilterData({
      ...filterData,
      price: `${min}-${max}`,
    });
  };

  const handlePageLimit = (value) => setPageLimit(value);

  return (
    <div className="row justify-content-space-evenly align-items-end my-20">
      <div className="col-xs-12 col-md-4 col-lg-3 py-3">
        {menu && (
          <SelectCheckboxGroup
            filterData={filterData.category}
            data={menu}
            title={t("category")}
            onSelect={handleFilterCategory}
          />
        )}
      </div>
      <div className="col-xs-12 col-md-4 col-lg-3 py-3">
        {brands && (
          <SelectCheckbox
            filterData={filterData.brand}
            data={brands}
            title={t("menu.brands")}
            onSelect={handleFilterBrand}
          />
        )}
      </div>
      <div className="col-xs-12 col-md-2 col-xl-3 py-3">
        {/* <SelectOptions
          selectedData={pageLimit}
          data={showNum}
          title="Göster"
          onSelect={handlePageLimit}
        /> */}
      </div>
      <div className="col-xs-12 col-md-2 col-xl-3 py-3">
        <h5 className="fs-4 text-center fw-bold">{t("price")}</h5>
        <PriceFilter
          filterByPrice={handlePriceSlider}
          setActive_={setActive_}
        />
      </div>
    </div>
  );
}
