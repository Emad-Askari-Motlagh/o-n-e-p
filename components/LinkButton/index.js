import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

export default function LinkButton({ width, style, children, onClick, href }) {
  return (
    <div
      className={styles.button_con}
      style={{ width: width }}
      onClick={onClick}>
      <Link href={href}>
        <a className={styles.btn_grad}>{children}</a>
      </Link>
    </div>
  );
}
