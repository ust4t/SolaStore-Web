import React from "react";

export default function index() {
  const [cardInfo, setCardInfo] = React.useState({
    cardName: "",
    cardNumber: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    minCardYear: new Date().getFullYear(),
    amexCardMask: "#### ###### #####",
    otherCardMask: "#### #### #### ####",
    cardNumberTemp: "",
  });

  const [isCardFlipped, setIsCardFlipped] = React.useState(false);
  const [focusElementStyle, setFocusElementStyle] = React.useState(null);
  const [isInputFocused, setIsInputFocused] = React.useState(false);

  useState(() => {
    cardInfo.cardNumberTemp = cardInfo.otherCardMask;
    document.getElementById("cardNumber").focus();
  }, []);

  const getCardType = () => {
    let number = cardInfo.cardNumber;
    let re = new RegExp("^4");
    if (number.match(re) != null) return "visa";

    re = new RegExp("^(34|37)");
    if (number.match(re) != null) return "amex";

    re = new RegExp("^5[1-5]");
    if (number.match(re) != null) return "mastercard";

    re = new RegExp("^6011");
    if (number.match(re) != null) return "discover";

    re = new RegExp("^9792");
    if (number.match(re) != null) return "troy";

    return "visa"; // default type
  };

  const generateCardNumberMask = () => {
    return getCardType() === "amex"
      ? cardInfo.amexCardMask
      : cardInfo.otherCardMask;
  };
  const minCardMonth = () => {
    if (cardInfo.cardYear === cardInfo.minCardYear)
      return new Date().getMonth() + 1;
    return 1;
  };

  useEffect(() => {
    if (cardInfo.cardMonth < minCardMonth()) {
      setCardInfo({ ...cardInfo, cardMonth: "" });
    }
  }, [cardInfo.cardYear]);

  const flipCard = (status) => {
    setIsCardFlipped(status);
  };

  const focusInput = (e) => {
    setIsInputFocused(true);
    let targetRef = e.target;
    setFocusElementStyle({
      width: `${target.offsetWidth}px`,
      height: `${target.offsetHeight}px`,
      transform: `translateX(${target.offsetLeft}px) translateY(${target.offsetTop}px)`,
    });
  };

  const blurInput = () => {
    setTimeout(() => {
      if (!isInputFocused) {
        setFocusElementStyle(null);
      }
    }, 300);
    setIsInputFocused(false);
  };

  return <div></div>;
}
