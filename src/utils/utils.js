export const activeData = (active, sort, products) => {
  function _(number) {
    return number <= 9 ? `0${number}` : number;
  }
  return `Showing ${
    products && products.length ? _(active * sort + 1) : "00"
  }–${
    products && products.length > (active + 1) * sort
      ? _((active + 1) * sort)
      : _(products && products.length)
  }
     of ${_(products && products.length)} results`;
};

export const clickToActive = (activeArr, value, setActiveArr) => {
  if (activeArr.includes(value)) {
    setActiveArr(activeArr.filter((active) => active !== value));
  } else {
    setActiveArr([...activeArr, value]);
  }
};

export const scroll = () => {
  let offset = window.scrollY;
  const sticky = document.getElementById("header-sticky");
  if (sticky) {
    if (offset > 300) {
      sticky.classList.add("sticky-header");
    } else {
      sticky.classList.remove("sticky-header");
    }
  }
};

export const dblock = (active, id, sort) => {
  if (active === 0) {
    return id + 1 >= 0 && id + 1 <= sort ? "d-block" : "d-none";
  } else {
    return id + 1 > active * sort && id + 1 <= (active + 1) * sort
      ? "d-block"
      : "d-none";
  }
};
