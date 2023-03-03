import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";

interface Props {
  description: string;
  name: string;
  ImageSrc: string;
  id: string;
}

export default function MenuDescription({
  description,
  name,
  ImageSrc,
}: Props) {
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
