import { useLottie } from "lottie-react";
import toast from "react-hot-toast";

const AnimatedToast = ({
  animationData,
  message,
  hotToast,
  messageSize = "2rem",
  config = {},
}) => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
    ...config,
  };

  const { View } = useLottie(options);
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
      </div>
    </div>
  );
};

export default AnimatedToast;
