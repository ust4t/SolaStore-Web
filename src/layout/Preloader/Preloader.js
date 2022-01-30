import { preloader_wrapper, preloader } from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={preloader_wrapper}>
      <div className={preloader}>
        <span />
        <span />
      </div>
    </div>
  );
};

export default Preloader;
