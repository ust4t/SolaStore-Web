import { useEffect } from "react";
let addBtn, cart, imgClone, container;
const speed = 1200,
  curveDelay = 900,
  position = "absolute";

export default function useCartAnim({ el, src, btnRef }) {
  function init() {
    container = document.querySelector(".cartContainer");
    addBtn = document.querySelector(btnRef);
    cart = document.querySelector(".cartAnim");
    imgClone = document.createElement("img");
    imgClone.src = src;
    imgClone.width = "130";
    imgClone.height = "200";

    addBtn.addEventListener("click", addItem);
  }

  function addItem() {
    let btnY = el.getBoundingClientRect().top,
      btnX = el.getBoundingClientRect().left,
      flyingBtn = imgClone.cloneNode();

    console.log(btnX, btnY);

    flyingBtn.classList.add("flyingBtn");
    flyingBtn.style.position = position;
    flyingBtn.style.top = `${
      btnY +
      (typeof window !== "undefined" && window.innerWidth < 600 ? btnY * 2 : 0)
    }px`;
    flyingBtn.style.left = `${btnX}px`;
    flyingBtn.style.opacity = "1";
    flyingBtn.style.transition = `all ${speed / 1000}s ease, top ${
      (speed + curveDelay) / 1000
    }s ease, left ${speed / 1000}s ease, transform ${speed / 1000}s ease ${
      (speed - 10) / 1000
    }s`;

    document.body.appendChild(flyingBtn);

    flyingBtn.style.top = `${cart.offsetTop + cart.offsetHeight - 16}px`;
    flyingBtn.style.left = `${cart.offsetLeft + cart.offsetWidth - 16}px`;
    flyingBtn.style.height = "1rem";
    flyingBtn.style.width = "1rem";
    flyingBtn.style.transform = "scale(0)";

    setTimeout(() => {
      flyingBtn.remove();
    }, speed * 1.5);
  }

  useEffect(() => {
    if (el) {
      init();
    }
  }, [el]);

  return;
}
