import React from "react";
import styles from "./styles.module.scss";
import { IoInformation, IoInformationCircleSharp } from "react-icons/io5";

export default function ErrorCard({
  children,
}: {
  children: React.ReactNode | string;
}) {
  return (
    <div className={styles["error-component"]}>
      <IoInformationCircleSharp
        size={35}
        color="tomato"></IoInformationCircleSharp>
      <span className={styles["error-message"]}>{children}</span>
    </div>
  );
}
