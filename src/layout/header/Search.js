import Router from "next/router";
import { useState } from "react";
import { connect } from "react-redux";
import { filterByName } from "../../redux/action/filter";

const Search = ({ active, hendelChangeSearch, filterByName }) => {
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
          onClick={() => hendelChangeSearch()}
        />
        <div className="search-cell">
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="search-field-holder">
              <input
                type="search"
                className="main-search-input"
                placeholder="Search Entire Store..."
                onChange={(e) => filterByName(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default connect(null, { filterByName })(Search);
