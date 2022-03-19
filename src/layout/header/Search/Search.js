import React, { useState, memo, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import sources from "../../../../sources";
import {
  suggestionBox,
  suggestItem,
  suggestImg,
  hoverItem,
} from "./Search.module.css";
import useDetectOutside from "../../../hooks/useDetectOutside";
import { encodeURLString, replaceUnescaped } from "../../../utils/utils";
import Loader from "../../../components/Loader";

function Search({ handleSearch, searchRef, placeholder }) {
  const { t } = useTranslation("common");
  const { lang } = useSelector((state) => state);
  let timeout = null;
  const [loading, setLoading] = useState(false);
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggest, setSuggest] = useState([]);

  const suggestRef = useRef("");

  useDetectOutside(suggestRef, hideSuggest);

  function hideSuggest() {
    setShowSuggest(false);
  }

  const handleSearchAutoComplete = (e) => {
    const charCode = e.keyCode;
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);

    if (
      (charCode > 64 && charCode < 91) ||
      (charCode > 96 && charCode < 123) ||
      charCode == 8 ||
      (charCode >= 48 && charCode <= 57) ||
      charCode == 8 /*BCKSPC*/ ||
      charCode == 45 /*minus sign*/ ||
      isMobileDevice
    ) {
      clearTimeout(timeout);

      timeout = setTimeout(async function () {
        if (searchRef.current && searchRef.current.value.length >= 1) {
          try {
            setLoading(true);
            setShowSuggest(true);
            const { data } = await axios.get(
              `/api/helpers/searchResult?searchQuery=${replaceUnescaped(
                searchRef.current.value.toLowerCase()
              ).toUpperCase()}&lang=${lang.lang}`
            );
            setSuggest(data);
          } catch (error) {
            setSuggest([]);
            setShowSuggest(false);
          } finally {
            setLoading(false);
          }
        } else {
          setSuggest([]);
          setShowSuggest(false);
        }
      }, 1000);
    }
  };

  return (
    <div className="input-group position-relative">
      <input
        onClick={() => !showSuggest && setShowSuggest(true)}
        ref={searchRef}
        onKeyUp={handleSearchAutoComplete}
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
        </button>
      </div>
      {!!suggest.length && showSuggest && (
        <div ref={suggestRef} className={suggestionBox}>
          {loading ? (
            <div className="row p-2 align-items-center justify-content-center">
              <Loader />
            </div>
          ) : (
            suggest.map(({ id, masterId, name, pic }, i) => (
              <Link
                key={`${id}.!.${i}`}
                href={{
                  pathname: `/detail/${encodeURLString(name)}:${masterId}`,
                  query: {
                    selected: id,
                  },
                }}>
                <div
                  onClick={() => setShowSuggest(false)}
                  className={`row p-2 align-items-center ${hoverItem} justify-content-center justify-content-md-start`}>
                  <img
                    className={`col-12 col-md-2 ${suggestImg} mb-1 mb-md-0`}
                    src={`${sources.imageMinSrc}${pic}`}
                    alt=""
                  />
                  <p
                    className={`col-md-5 col-lg-10 ${suggestItem} text-center text-md-start`}>
                    {name}
                  </p>
                </div>
              </Link>
            ))
          )}
          <Link
            href={{
              pathname: `/search`,
              query: {
                searchText: searchRef.current.value,
              },
            }}>
            <a className="d-block w-100 p-2 text-center fs-5 fs-bold">
              {t("showMore")}
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default memo(Search);
