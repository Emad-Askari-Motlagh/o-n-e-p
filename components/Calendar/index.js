import React, { useEffect } from "react";
import styles from "./styles.module.scss";

export default function Calendar() {
  return (
    <div className={styles.cont}>
      <div className={styles.weeks_cont}></div>
    </div>
  );
}
