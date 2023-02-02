import React from "react";
import styles from "./styles.module.scss";

export default function AdminOrdersInfo({ currentOrderInfo }) {
  return (
    <div className={styles.AdminOrdersInfo_container}>
      <div className={styles.row}>
        <span>Item`s Id:</span>
        <span> {currentOrderInfo?._id}</span>
      </div>
      <div>
        <span>Costumer Comment:</span>

        <div>{currentOrderInfo?.description}</div>
      </div>

      <label>Extra Items</label>
      {currentOrderInfo?.extra?.length &&
        currentOrderInfo?.extra?.map((res, i) => {
          return (
            <div className={styles.row} key={i}>
              <span>Item`s name:</span>
              <span
                style={{
                  marginLeft: "2rem",
                  marginRight: "auto",
                }}>
                {res.name}
              </span>
              <span>{res.quantity}</span>
            </div>
          );
        })}
    </div>
  );
}
