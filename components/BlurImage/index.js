import React from "react";
import Image from "next/image";
import styles from "./style.module.scss";

export default function BlurImage({ Layout, width, height, src, alt }) {
  return (
    <>
      {" "}
      <Image
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        src={src ? src : "/blur_image.webp"}
        className={styles.image}
        width={width}
        height={height}
        layout={Layout}
        placeholder="blur"
        blurDataURL="/blur_image.webp"
        alt={alt}
      ></Image>
    </>
  );
}
