import Link from "next/dist/client/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import { filterByName, filterByPrice } from "../../../redux/action/filter";
import { getProducts } from "../../../redux/action/product";
import {
  findFilterValue,
  hideProduct,
  totalProductByKey,
} from "../../../utils/utils";
import PriceFilter from "./PriceFilter";

const Filter2 = ({
  products,
  getProducts,
  setActive_,
  filterByPrice,
  filterByName,
  search,
}) => {
  useEffect(() => {
    getProducts();
  }, []);
  const tags = findFilterValue(products, "tags"),
    category = findFilterValue(products, "category", [
      "home_1",
      "home_2",
      "home_3",
      "home_4",
      "home_5",
    ]);
  return (
    <div className="bar-area">
      <div className="side-search mb-45">
        <h6 className="shop-title">Search by</h6>
        <form
          action="#"
          className="shop-search"
          onSubmit={(e) => e.preventDefault()}>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Your keyword...."
              value={search}
              // onChange={(e) => filterByName(e.target.value)}
            />
            <span
              className="input-group-text bg-dark text-white "
              id="basic-addon2">
              Search
            </span>
          </div>
        </form>
      </div>
      <div className="side-cat mb-45">
        <h6 className="cat-title pb-20">Categories</h6>
        <ul>
          {/* {category &&
            category.map(
              (category) =>
                category !== "cloth" && (
                  <li key={category}>
                    <Link href={`/shop/category/${category}`}>
                      <a className="text-capitalize">
                        {category} (
                        {totalProductByKey(products, "category", category)})
                      </a>
                    </Link>
                  </li>
                )
            )} */}
        </ul>
      </div>
      <div className="slider-range mb-40">
        <div className="cat-title mb-20">
          <h6>Filter By Price</h6>
        </div>
        <PriceFilter filterByPrice={filterByPrice} setActive_={setActive_} />
      </div>
      <div className="side-tag mb-50">
        <h6 className="cat-title pb-20">Popular Tag</h6>
        <ul>
          {/* {tags &&
            tags.map((tag, i) => (
              <li key={i}>
                <Link href={`/shop/tags/${tag}`}>
                  <a className="text-capitalize">{tag}</a>
                </Link>
              </li>
            ))} */}
        </ul>
      </div>
      <div className="side-product mb-50">
        <h6 className="cat-title pb-20">Recent Product</h6>
        {products &&
          hideProduct(products).map(
            (product, i) =>
              i < 3 && (
                <div className="side-pro-wrapper mb-20" key={i}>
                  <div className="side-pro-img">
                    <Link href={`/shop/${product.masterProductID}`}>
                      <a>
                        <img
                          src={product.picture_1}
                          className="img-fluid"
                          alt="Product"
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="side-pro-text">
                    <h6>
                      <Link href={`/shop/${product.masterProductID}`}>
                        <a>{product.productShortName}</a>
                      </Link>
                    </h6>
                    <span className="price">
                      {/* ${Number(product.mainPrice).toFixed(2)}{" "} */}
                      {product.price && (
                        <del>${Number(product.price).toFixed(2)}</del>
                      )}
                    </span>
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  search: state.filter.search,
  products: state.product.products,
  search: state.filter.search,
});

export default connect(mapStateToProps, {
  getProducts,
  filterByPrice,
  filterByName,
})(Filter2);
