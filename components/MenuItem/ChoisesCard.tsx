import React, { useState } from "react";
import styles from "./style.module.scss";

export default function ChoisesCard({
  costumerExtra,
  setSelection,
  selection,
  children,
}) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className={styles.choises_card_parent}>
      <div className={styles.parent}>
        <span style={{ color: "white" }}>{selection.name}</span>
        <span style={{ color: "white" }}>{selection.quantity}</span>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            minWidth: "50px",
          }}>
          {children}
        </span>
      </div>
    </div>
  );
}
const Item = () => {};
