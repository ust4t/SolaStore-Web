export const setLocalStorage = (name, items) => {
  localStorage.setItem(name, JSON.stringify(items));
};
export const getLocalStorage = (name, fallback = []) => {
  const data = localStorage.getItem(name);
  if (data) {
    return JSON.parse(data);
  } else {
    localStorage.setItem(name, JSON.stringify(fallback));
    return [];
  }
};
