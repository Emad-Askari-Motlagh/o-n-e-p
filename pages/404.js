import React from "react";
import styles from "../styles/share.module.scss";
import PrimaryLayout from "components/Primary-layout";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className={styles.error_container}>
      <h5 style={{ fontSize: 64, color: "whitesmoke" }}>404</h5>
      <div className={styles.error_messaage}>
        The content you are looking for is not available at the moment
      </div>
      <Link href="/">
        <div className={styles.navigate_suggestion}>Continue ...</div>
      </Link>
    </div>
  );
}

ErrorPage.Layout = PrimaryLayout;
