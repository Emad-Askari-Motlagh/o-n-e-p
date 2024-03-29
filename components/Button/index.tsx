import React from "react";
import styles from "./styles.module.scss";

type ButtonProps = {
  width?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
};

export default function Button({
  width,
  style,
  children,
  type,
  onClick,
}: ButtonProps) {
  return (
    <div className={styles.container} style={{ width: width }}>
      <button onClick={onClick} className={styles.btn_grad} type={type}>
        {children}
      </button>
    </div>
  );
}
