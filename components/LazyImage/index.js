import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

export default function LazyImage({ images, width, height }) {
  return (
    <div className={styles.images}>
      <Image
        src={images[1] ?? "/1.webp"}
        width={width}
        alt="Lazy"
        height={height}
        layout="responsive"></Image>
    </div>
  );
}
