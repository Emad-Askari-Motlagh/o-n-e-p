import Image from "next/image";
import React from "react";
import styles from "./styles.module.scss";

const SummaryItem = ({
  name,
  ImageSrc,
  removeOrder,
  id,
  addOrder,
  price,
  quantity,
}) => {
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

      <div className={styles.quantity_parent}>
        <span
          className={styles.plus_button}
          onClick={() => {
            addOrder({
              variables: { productId: id },
            });
          }}>
          +
        </span>
        <span>{quantity}</span>
        <span
          className={styles.minus_button}
          onClick={() =>
            removeOrder({
              variables: { productId: id },
            })
          }>
          -
        </span>
      </div>
      <div className={styles.price_cont}>
        <span>{`${sum > 0 ? sum : 0},00 kr`}</span>
      </div>
    </div>
  );
};

export default SummaryItem;
