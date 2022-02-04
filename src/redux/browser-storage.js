import Cookies from "cookies";

export function loadState(key) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // Ignore
    console.log(e);
  }
}

export function saveCookie({ key, value, req, res }) {
  const cookies = new Cookies(req, res);
  cookies.set(key, JSON.stringify(value), {
    domain: "yenisite.solastore.com.tr",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "strict",
  });
}
