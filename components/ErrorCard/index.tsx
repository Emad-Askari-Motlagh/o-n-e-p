import React from "react";
import styles from "./styles.module.scss";
import { BiErrorAlt } from "react-icons/bi";

export default function ErrorCard({
  children,
}: {
  children: React.ReactNode | string;
}) {
  return (
    <div className={styles["error-component"]}>
      <BiErrorAlt size={35} color="#ff6f6197"></BiErrorAlt>
      <span className={styles["error-message"]}>{children}</span>
    </div>
  );
}
