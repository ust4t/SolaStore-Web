import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import SelectCheckboxGroup from "../../components/form/SelectCheckboxGroup";
import SelectCheckbox from "../../components/form/SelectCheckbox";
import axios from "axios";
import { useQuery } from "react-query";

const fetchCategories = async () => {
  const { data } = await axios.get("/api/getFullMenu");
  return data;
};

export default function FilterSearch() {
  // const [category, setCategory] = useState([]);
  // const { isLoading } = useQuery("category", fetchCategories, {
  //   onSuccess: (data) => {
  //     setCategory(data);
  //   },
  // });
  // console.log(category);
  const state = useSelector((state) => state);

  console.log(state);

  const [filterData, setFilterData] = useState({
    category: [],
    brand: [],
    price: [],
  });
  const dataset = {
    prices: [
      {
        brandName: "0-10",
        brandID: "0-10",
      },
      {
        brandName: "10-20",
        brandID: "10-20",
      },
      {
        brandName: "20-30",
        brandID: "20-30",
      },
    ],
  };

  const navigateToSearch = () => {
    console.log(filterData);
    alert("search");
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

  const handleFilterPrice = (e, value) => {
    if (e.target.checked) {
      setFilterData({
        ...filterData,
        price: [
          ...filterData.price,
          !filterData.price.includes(value) ? value : null,
        ],
      });
    } else {
      setFilterData({
        ...filterData,
        price: filterData.price.filter((item) => item !== value),
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

  return (
    <div className="container py-3">
      <div className="row justify-content-space-evenly align-items-end">
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          {state.menu.menuData && (
            <SelectCheckboxGroup
              filterData={filterData.category}
              // data={dataset.categories}
              data={state.menu.menuData}
              title="Kategori"
              onSelect={handleFilterCategory}
            />
          )}
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          {state.brands.brands && (
            <SelectCheckbox
              filterData={filterData.brand}
              data={state.brands.brands}
              title="Marka"
              onSelect={handleFilterBrand}
            />
          )}
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          <SelectCheckbox
            filterData={filterData.price}
            data={dataset.prices}
            title="Fiyat"
            onSelect={handleFilterPrice}
          />
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
