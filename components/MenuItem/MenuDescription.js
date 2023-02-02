import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";

export default function MenuDescription({ description, name, ImageSrc }) {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src={ImageSrc}
        width={200}
        alt="Menu Item"
        height={200}
        layout="intrinsic"
      />

      <div className={styles.description}>
        <label>{name}</label>
        <p>{description}</p>
      </div>
    </div>
  );
}
