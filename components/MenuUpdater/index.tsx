import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

interface MenuUpdater {
  name: string;
  ImageSrc: string;
  id: number;
  price: number;
  quantity: number;
}
const MenuUpdater = ({ name, ImageSrc, price, quantity }: MenuUpdater) => {
  const sum = price * quantity;
  return (
    <div className={styles.container}>
      {ImageSrc && (
        <Image
          className={styles.image}
          src={ImageSrc}
          alt="/Summary"
          width={80}
          height={80}
          layout="fixed"
        />
      )}

      <div className={styles.description}>
        <label>{name}</label>
      </div>

      <div className={styles.price_cont}>
        <span>{price} , 00</span>
      </div>
    </div>
  );
};

export default MenuUpdater;
