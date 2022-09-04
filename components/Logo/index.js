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
        width={30}
        height={30}
        className={styles.label}></Image>
    </div>
  );
}
