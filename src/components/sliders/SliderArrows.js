import { animationCreate } from "../../utils/utils";

export const Arrow = ({ icon, onClick, className, text }) => {
  const ClickEvent = () => {
    onClick();
    animationCreate();
  };
  return (
    <button type="button" className={className} onClick={ClickEvent}>
      <i className={icon} />
      {text && <span>{text}</span>}
    </button>
  );
};
