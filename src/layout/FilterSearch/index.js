import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import SelectCheckboxGroup from "../../components/form/SelectCheckboxGroup";
import SelectCheckbox from "../../components/form/SelectCheckbox";
import PriceFilter from "../../components/product/filter/PriceFilter";

export default function FilterSearch({ brands }) {
  const { push } = useRouter();
  const menu = useSelector((state) => state.menu.menuData);

  const [filterData, setFilterData] = useState({
    category: [],
    brand: [],
    price: "",
  });
  // const dataset = {
  //   prices: [
  //     {
  //       brandName: "0-10",
  //       brandID: "0-10",
  //     },
  //     {
  //       brandName: "10-20",
  //       brandID: "10-20",
  //     },
  //     {
  //       brandName: "20-30",
  //       brandID: "20-30",
  //     },
  //     {
  //       brandName: "30-40",
  //       brandID: "30-40",
  //     },
  //     {
  //       brandName: "40-50",
  //       brandID: "40-50",
  //     },
  //     {
  //       brandName: "50-60",
  //       brandID: "50-60",
  //     },
  //     {
  //       brandName: "60-70",
  //       brandID: "60-70",
  //     },
  //     {
  //       brandName: "70-80",
  //       brandID: "70-80",
  //     },
  //     {
  //       brandName: "80-90",
  //       brandID: "80-90",
  //     },
  //   ],
  // };

  const navigateToSearch = () => {
    push({
      pathname: "/shop",
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

  return (
    <div className="container py-3">
      <div className="row justify-content-space-evenly align-items-end">
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
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          {/* <SelectCheckbox
            filterData={filterData.price}
            data={dataset.prices}
            title="Fiyat"
            onSelect={handleFilterPrice}
          /> */}
          <h5 className="fs-4 text-center fw-bold pb-10">Fiyat</h5>
          <PriceFilter filterByPrice={handlePriceSelect} />
        </div>
        <div className="col-xs-12 col-lg-3 py-3 d-flex align-items-end justify-content-center h-100 rounded">
          <button
            onClick={navigateToSearch}
            className="btn btn-main text-uppercase shadow-none w-100 h-100">
            Ara
          </button>
        </div>
      </div>
    </div>
  );
}
