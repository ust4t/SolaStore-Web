import * as React from "react";
import SelectCheckboxGroup from "../../components/form/SelectCheckboxGroup";
import SelectCheckbox from "../../components/form/SelectCheckbox";

export default function FilterSearch() {
  const [filterData, setFilterData] = React.useState({
    category: [],
    brand: [],
    price: [],
  });

  const dataset = {
    categories: [
      {
        name: "Elbise",
        value: "13",
        subcategories: [
          {
            name: "Günlük Elbise",
            value: "2",
          },
          {
            name: "Uzun elbise",
            value: "3",
          },
        ],
      },
      {
        name: "Üst giyim",
        value: "14",
        subcategories: [
          {
            name: "triko",
            value: "5",
          },
          {
            name: "bluz",
            value: "8",
          },
        ],
      },
    ],
    brands: [
      {
        name: "Adidas",
        value: "1",
      },
      {
        name: "Nike",
        value: "2",
      },
      {
        name: "Puma",
        value: "3",
      },
      {
        name: "New Balance",
        value: "4",
      },
      {
        name: "Reebok",
        value: "5",
      },
      {
        name: "Asics",
        value: "6",
      },
      {
        name: "Vans",
        value: "7",
      },
      {
        name: "Converse",
        value: "8",
      },
      {
        name: "Lacoste",
        value: "9",
      },
      {
        name: "Bata",
        value: "10",
      },
      {
        name: "Gucci",
        value: "11",
      },
      {
        name: "Armani",
        value: "12",
      },
      {
        name: "Valentino",
        value: "13",
      },
      {
        name: "Dolce & Gabbana",
        value: "14",
      },
      {
        name: "Versace",
        value: "15",
      },
    ],
    prices: [
      {
        name: "0-10",
        value: "0-10",
      },
      {
        name: "10-20",
        value: "10-20",
      },
      {
        name: "20-30",
        value: "20-30",
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
    <div className="container  py-3">
      <div className="row justify-content-space-evenly align-items-end">
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          <SelectCheckboxGroup
            filterData={filterData.category}
            data={dataset.categories}
            title="Kategori"
            onSelect={handleFilterCategory}
          />
        </div>
        <div className="col-xs-12 col-md-4 col-lg-3 py-3">
          <SelectCheckbox
            filterData={filterData.brand}
            data={dataset.brands}
            title="Marka"
            onSelect={handleFilterBrand}
          />
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
