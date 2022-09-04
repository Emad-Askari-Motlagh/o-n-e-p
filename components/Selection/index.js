import React from "react";
import styles from "./styles.module.scss";

export default function Selection() {
  return (
    <div className={styles.container}>
      <select className={styles.parent} placeholder="kk">
        <option>first</option>
        <option>secound</option>
        <option>last</option>
      </select>
    </div>
  );
}
