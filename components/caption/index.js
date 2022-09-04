import React, { useEffect, useRef } from "react";
import styles from "./Description.module.scss";

export default function FirstPage_description() {
  return (
    <div className={styles.descript}>
      <h3 className={styles.header}>Web Utveckling</h3>
      <h5 className={styles.description}>
        We hjälper dig att bygga ditt företag
      </h5>
    </div>
  );
}
