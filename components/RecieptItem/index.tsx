import React from "react";
import styles from "./styles.module.scss";

export default function RecieptItem({ name, id, date, price }) {
  return (
    <div className={styles.recipet_container}>
      <div className={styles.items_parent}>
        <span>{id}</span>
        <h3>{name}</h3>
        <span>{new Date(date).toLocaleString()}</span>
        <span>{`${price},kr`}</span>
      </div>
    </div>
  );
}
