import { useLottie } from "lottie-react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import { controlsBtn } from "./AnimatedToast.module.css";

const AnimatedToast = ({
  animationData,
  message,
  hotToast,
  messageSize = "2rem",
  controls,
  buttonLeftTitle,
  buttonRightTitle,
  buttonLeftRoute = "/",
  config = {},
}) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
    ...config,
  };
  const router = useRouter();
  const { View } = useLottie(options);

  const navigateToBasket = () => router.push(buttonLeftRoute);
  return (
    <div
      className="row cursor-pointer"
      onClick={() => toast.dismiss(hotToast.id)}>
      <div className="col-12 d-flex flex-column align-items-center justify-content-center">
        {View}
        <h5
          style={{
            fontSize: messageSize,
          }}
          className="text-center">
          {message}
        </h5>
        {controls && (
          <div className="d-flex align-items-center justify-content-center">
            <button onClick={navigateToBasket} className={controlsBtn}>
              {buttonLeftTitle}
            </button>
            <button className={controlsBtn}>{buttonRightTitle}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimatedToast;
