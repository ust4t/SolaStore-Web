import React from "react";
import { memo } from "react";

function Search({ handleSearch, searchRef, placeholder }) {
  return (
    <div className="input-group">
      {" "}
      <input
        ref={searchRef}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        type="text"
        className="form-control input-text"
        placeholder={placeholder}
        aria-label
        aria-describedby="basic-addon2"
      />
      <div className="input-group-append">
        <button
          onClick={handleSearch}
          className="btn btn-outline-dark btn-lg"
          style={{
            padding: ".5rem 0.5rem",
          }}
          type="button">
          <i className="fa fa-search" />
        </button>{" "}
      </div>
    </div>
  );
}

export default memo(Search);
