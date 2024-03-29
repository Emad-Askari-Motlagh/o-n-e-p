import React from "react";
import styles from "./styles.module.scss";

interface ButtonTypes {
  onClick: () => void;
  children: string;
  type: any;
  width?: string;
}
export default function Button2({
  onClick,
  type,
  children,
  width,
}: ButtonTypes) {
  return (
    <div className={styles.button_container} style={{ width }}>
      <button
        onClick={onClick}
        type={type}
        className={styles["button-74"]}
        role="button">
        {children}
      </button>
    </div>
  );
}
