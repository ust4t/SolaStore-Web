import toast from "react-hot-toast";

const ToastComponent = ({
  icon,
  message,
  hotToast,
  iconSize = "3.5rem",
  messageSize = "2rem",
}) => (
  <div
    className="row cursor-pointer"
    onClick={() => toast.dismiss(hotToast.id)}>
    <div className="col-12 d-flex flex-column align-items-center justify-content-center">
      <i
        className={`${icon} my-2`}
        style={{
          fontSize: iconSize,
        }}
      />
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

export default ToastComponent;
