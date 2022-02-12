import React, { memo, Fragment } from "react";
import useTranslation from "next-translate/useTranslation";

import useDetectOutside from "../../hooks/useDetectOutside";

function SelectCheckboxGroup({
  filterData,
  title,
  data,
  onParentSelect = () => {},
  onChildSelect = () => {},
}) {
  const { t } = useTranslation("common");
  const dropdownRef = React.useRef(null);
  const [hidden, setHidden] = React.useState(true);
  const buttonText =
    filterData.length < 1 ? t("choose") : `${filterData.length} ${t("chosen")}`;

  useDetectOutside(dropdownRef, hideDropdown);

  function hideDropdown() {
    setHidden(true);
  }

  function toggleDropdown() {
    setHidden(!hidden);
  }

  return (
    <div
      ref={dropdownRef}
      className="dropdown category-lst on position-relative">
      <h5 className="fs-4 text-center fw-bold">{title}</h5>
      <button
        onClick={toggleDropdown}
        type="button"
        className="d-flex justify-content-space-around align-items-center multiselect dropdown-toggle btn btn-default shadow p-3 bg-body rounded w-100">
        <span className="multiselect-selected-text text-uppercase me-auto fs-5">
          {buttonText}
        </span>{" "}
        <b className="caret" />
      </button>
      <div
        style={{
          zIndex: "250",
          maxHeight: "300px",
        }}
        ref={dropdownRef}
        className={`animate__animated animate__faster ${
          !hidden ? "animate__zoomIn d-block" : "animate__zoomOut d-none"
        } dropdown-list shadow p-3 bg-body w-100 position-absolute overflow-auto`}>
        {data &&
          data.map(
            (
              {
                categoryID: mainCategoryID,
                selectedCategoryName,
                subcategories,
              },
              i
            ) => (
              <Fragment key={`${mainCategoryID}_._.?*${i}`}>
                <label
                  key={`${mainCategoryID}_<_${i}`}
                  className="d-block dropdown-option w-100 pt-2">
                  <input
                    type="checkbox"
                    name="dropdown-group"
                    checked={filterData.includes(mainCategoryID)}
                    value={mainCategoryID}
                    onChange={(e) =>
                      onParentSelect(e, [
                        mainCategoryID,
                        ...subcategories.map(({ categoryID }) => categoryID),
                      ])
                    }
                  />
                  <b className="ps-2 fs-6 text-uppercase">
                    {selectedCategoryName}
                  </b>
                </label>
                {subcategories &&
                  subcategories.map(
                    ({ categoryID, selectedCategoryName }, i) => (
                      <label
                        key={`${categoryID}.#${i + 1}`}
                        className="d-block dropdown-option w-100 ps-3 pt-2">
                        <input
                          checked={filterData.includes(categoryID)}
                          type="checkbox"
                          name="dropdown-group"
                          value={categoryID}
                          onChange={(e) => onChildSelect(e, categoryID)}
                        />
                        <b className="ps-2 fs-6 text-uppercase">
                          {selectedCategoryName}
                        </b>
                      </label>
                    )
                  )}
              </Fragment>
            )
          )}
      </div>
    </div>
  );
}
export default memo(SelectCheckboxGroup);
