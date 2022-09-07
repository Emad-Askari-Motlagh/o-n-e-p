import React from "react";
import styles from "./style.module.scss";

export default function Clickable({ removeOrder, addOrder, quantity }) {
  return (
    <div className={styles.choose_part}>
      <span
        onClick={() => {
          addOrder({
            variables: { productId: id },
          });
        }}>
        +
      </span>
      <span>{quantity}</span>
      <span
        onClick={() =>
          removeOrder({
            variables: { productId: id },
          })
        }>
        -
      </span>
    </div>
  );
}
