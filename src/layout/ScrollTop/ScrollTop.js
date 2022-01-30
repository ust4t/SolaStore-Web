import { useEffect, useState } from "react";

import { scrollUp } from "./ScrollTop.module.css";

const ScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    let offset = window.scrollY;
    const sticky = document.querySelector(`#${scrollUp}`);
    if (sticky) {
      if (offset > 300) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    }
  };
  return (
    <a
      id={scrollUp}
      href="#top"
      style={{
        position: "fixed",
        zIndex: 500,
        display: scrollTop ? "block" : "none",
      }}>
      <i className="fas fa-chevron-up" />
    </a>
  );
};

export default ScrollTop;
