import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const menu = useSelector((state) => state.menu.menuData);
  const { push, query } = useRouter();

  const [filterData, setFilterData] = useState({
    category: [],
    brand: [],
    price: "",
  });

  useEffect(() => {
    push({
      pathname: "/filter",
      query: {
        categoryIds: filterData.category.join(",") || query.categoryIds,
        brandIds: filterData.brand.join(",") || query.brandIds,
        searchPrice: filterData.price || query.searchPrice,
      },
    });
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
    console.log(min, max);
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
            title="Kategori"
            onSelect={handleFilterCategory}
          />
        )}
      </div>
      <div className="col-xs-12 col-md-4 col-lg-3 py-3">
        {brands && (
          <SelectCheckbox
            filterData={filterData.brand}
            data={brands}
            title="Marka"
            onSelect={handleFilterBrand}
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
        <h5 className="fs-4 text-center fw-bold">Fiyat</h5>
        <PriceFilter
          filterByPrice={handlePriceSlider}
          setActive_={setActive_}
        />
      </div>
    </div>
  );
}
