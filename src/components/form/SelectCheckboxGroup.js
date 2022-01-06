import React from "react";
import useDetectOutside from "../../hooks/useDetectOutside";

export default function SelectCheckboxGroup({
  filterData,
  title,
  data,
  onSelect,
}) {
  const dropdownRef = React.useRef(null);
  const [hidden, setHidden] = React.useState(true);

  const buttonText =
    filterData.length < 1 ? "seçiniz" : `${filterData.length} seçildi`;

  useDetectOutside(dropdownRef, hideDropdown);

  function hideDropdown() {
    setHidden(true);
  }

  function toggleDropdown() {
    setHidden(!hidden);
  }

  return (
    <div className="dropdown category-lst on position-relative">
      <h5 className="fs-4 text-center fw-bold">{title}</h5>
      <button
        onClick={toggleDropdown}
        type="button"
        className="d-flex justify-content-space-around align-items-center multiselect dropdown-toggle btn btn-default shadow p-3 bg-body rounded w-100">
        <span className="multiselect-selected-text text-uppercase me-auto fs-5">
          {buttonText}
        </span>{" "}
        <b className="caret"></b>
      </button>
      <div
        ref={dropdownRef}
        className={`animate__animated animate__faster ${
          !hidden ? "animate__zoomIn d-block" : "animate__zoomOut d-none"
        } dropdown-list shadow p-3 bg-body z-index-first w-100 position-absolute`}>
        {data &&
          data.map(({ value, name, subcategories }, i) => (
            <>
              <label
                key={`${value}_<_${i}`}
                className="d-block dropdown-option w-100 pt-2">
                <input
                  type="checkbox"
                  name="dropdown-group"
                  value={value}
                  onChange={(e) => onSelect(e, value)}
                />
                <b className="ps-2 fs-6 text-uppercase">{name}</b>
              </label>
              {subcategories &&
                subcategories.map(({ value, name }, i) => (
                  <label
                    key={`${value}#${i}`}
                    className="d-block dropdown-option w-100 ps-3 pt-2">
                    <input
                      type="checkbox"
                      name="dropdown-group"
                      value={value}
                      onChange={(e) => onSelect(e, value)}
                    />
                    <b className="ps-2 fs-6 text-uppercase">{name}</b>
                  </label>
                ))}
            </>
          ))}
      </div>
    </div>
  );
}
