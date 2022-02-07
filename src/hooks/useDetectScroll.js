import { useEffect } from "react";

export default function useDetectScroll(func) {
  const checkWindow = typeof window !== "undefined";

  const handleScroll = () => {
    if (checkWindow) {
      func();
    }
  };

  useEffect(() => {
    if (checkWindow) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (checkWindow) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
}
