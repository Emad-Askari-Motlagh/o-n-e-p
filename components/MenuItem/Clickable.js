import React from "react";
import styles from "./style.module.scss";

export default function Clickable({ removeOrder, addOrder, quantity, id }) {
  return (
    <div className={styles.choose_part}>
      <span onClick={addOrder}>+</span>
      <span>{quantity}</span>
      <span onClick={removeOrder}>-</span>
    </div>
  );
}
