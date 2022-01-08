import React from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles["lds-ripple"]}>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
