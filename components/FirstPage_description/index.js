import React, { useEffect, useRef } from "react";
import styles from "./description.module.scss";
import Link from "next/link";

export default function FirstPage_description() {
  const dropdownRef = useRef(null);

  return (
    <div className={styles.descript}>
      <div className={styles.descriptsecoundtdiv}>
        <div className={styles.descript_image}>
          <h3>Sell And Shop </h3>
          <h5>We help you to get or sell what you want</h5>
        </div>
        <Link href="#">
          <a className={styles.button}>Begin to search</a>
        </Link>
      </div>
    </div>
  );
}
