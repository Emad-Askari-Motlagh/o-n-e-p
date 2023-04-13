import Link from "next/link";
import React, { CSSProperties } from "react";
import styles from "./styles.module.scss";
interface LinkButton {
  width?: string;
  style?: CSSProperties;
  children: React.ReactNode;
  href: string;
}
export default function LinkButton({
  width,
  style,
  children,
  href,
}: LinkButton) {
  return (
    <div className={styles.button_con} style={{ width: width }}>
      <Link href={href}>
        <a className={styles.btn_grad}>{children}</a>
      </Link>
    </div>
  );
}
