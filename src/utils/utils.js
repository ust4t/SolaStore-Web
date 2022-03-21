export const activeData = (active, sort, products) => {
  function _(number) {
    return number <= 9 ? `0${number}` : number;
  }

  return {
    min: ` ${products ? _(active * sort + 1) : "00"}–${
      products > (active + 1) * sort ? _((active + 1) * sort) : _(products)
    }`,
    max: _(products),
  };
};

export const timestamp = (dateParam) => {
  let timeIndex = 0;
  let shifts = [
    35,
    60,
    60 * 3,
    60 * 60 * 2,
    60 * 60 * 25,
    60 * 60 * 24 * 4,
    60 * 60 * 24 * 10,
  ];

  let now = new Date(dateParam);
  let shift = shifts[timeIndex++] || 0;
  let date = new Date(now - shift * 1000);

  return date.getTime() / 1000;
};

export const clickToActive = (activeArr, value, setActiveArr) => {
  if (activeArr.includes(value)) {
    setActiveArr(activeArr.filter((active) => active !== value));
  } else {
    setActiveArr([...activeArr, value]);
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

export const encodeURLString = (url) => {
  return url
    .toLowerCase()
    .replace(/[`~!@#$%^&*()_|+\-=? ;'",.<>\{\}\[\]\\\/]/gi, "-");
};

export const replaceUnescaped = (text) => {
  return text
    .replace(/ı/g, "i")
    .replace(/ü/g, "u")
    .replace(/ğ/g, "g")
    .replace(/ş/g, "s")
    .replace(/ç/g, "c");
};

export const chooseContent = ({ data, locale }) => {
  switch (locale) {
    case "tr":
      return {
        header: data.headerTR,
        content: data.contentTR,
      };
    case "en":
      return {
        header: data.headerEN,
        content: data.contentEN,
      };

    case "fr":
      return {
        header: data.headerFR,
        content: data.contentFR,
      };
    case "ar":
      return {
        header: data.headerAR,
        content: data.contentAR,
      };
    case "ru":
      return {
        header: data.headerRU,
        content: data.contentRU,
      };

    default:
      return {
        header: data.headerRU,
        content: data.contentRU,
      };
  }
};
