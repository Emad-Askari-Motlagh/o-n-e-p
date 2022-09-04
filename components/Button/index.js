import React from "react";
import styles from "./styles.module.scss";

export default function Button({ width, style, children, onClick }) {
  return (
    <div className={styles.container} style={{ width: width }}>
      <button onClick={onClick} className={styles.btn_grad}>
        {children}
      </button>
    </div>
  );
}
