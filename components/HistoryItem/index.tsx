import React, { useEffect } from "react";
import RecieptItem from "../RecieptItem";
import styles from "./styles.module.scss";

export default function HistoryItem({ billInfo }: { billInfo: any }) {
  if (!billInfo) return null;

  return (
    <div className={styles.bill_info_container}>
      {billInfo?.products &&
        billInfo?.products.map((res, i) => {
          return (
            <RecieptItem
              key={res?._id}
              name={res?.name}
              date={new Date()}
              price={res.price}
              id={res?._id}></RecieptItem>
          );
        })}
      <div className={styles.price_parent}>
        <span>Transaction`s Time:</span>

        <span>{billInfo.date}</span>
      </div>

      <div className={styles.price_parent}>
        <span>Total Amount:</span>
        <span>{billInfo.price} kr</span>
      </div>
    </div>
  );
}
