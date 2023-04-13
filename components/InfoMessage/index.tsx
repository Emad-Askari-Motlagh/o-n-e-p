import React from "react";
import Label from "../Label";
import styles from "./style.module.scss";

export default function Warning({
  label,
  message,
}: {
  label?: string;
  message?: string;
}) {
  return (
    <div className={styles.container}>
      <Label label_name={label} />
      <div className={styles.error_Parent}>
        <span style={{ color: "white" }}>OBS!</span>
        <span style={{ color: "white" }}>{message}</span>
      </div>
    </div>
  );
}
