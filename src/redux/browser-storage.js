import axios from "axios";
import Cookies from "cookies";

export function loadState(key, fallback) {
  try {
    const serializedState = localStorage.getItem(key);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return fallback;
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

export function loadSession(key, fallback) {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (!serializedState) return fallback;
    return JSON.parse(serializedState);
  } catch (e) {
    return fallback;
  }
}

export function saveToSessionStorage(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch (e) {
    console.log(e);
  }
}

export function saveCookie({ key, value, req, res }) {
  const cookies = new Cookies(req, res);
  cookies.set(key, JSON.stringify(value), {
    // domain: "yenisite.solastore.com.tr",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: Date.now() + 1000 * 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "strict",
  });
}
