import React, { useEffect } from "react";
import TimeItem from "./TimeItem";
import styles from "./styles.module.scss";

export default function Times({ times }) {
  return (
    <div className={styles.times_container}>
      {times.map((res, i) => (
        <TimeItem key={i} time={res.time} />
      ))}
    </div>
  );
}
