import { useRouter } from "next/router";
import React from "react";
import styles from "./logo.module.scss";
import Image from "next/image";
export default function WebsiteName() {
  return (
    <div className={styles.logo_container}>
      <Image
        alt="WebsiteName"
        src={"/AllianceLogo.png"}
        className={styles.label}></Image>
    </div>
  );
}
