import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";

const Search = ({ active, hendelChangeSearch }) => {
  const [text, setText] = useState(false);
  if (text) {
    Router.push(
      {
        pathname: "/shop",
      },
      undefined,
      { shallow: true }
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setText(true);
    hendelChangeSearch();
  };
  return (
    <div className={`search-wrap ${active}`}>
      <div className="search-inner">
        <i
          className="fal fa-times search-close"
          id="search-close"
          onClick={hendelChangeSearch}
        />
        <div className="search-cell">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="search-field-holder">
              <input
                type="search"
                className="main-search-input"
                placeholder="Search Entire Store..."
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Search;
