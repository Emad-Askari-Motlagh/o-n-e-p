import { useState } from "react";
import styles from "./styles.module.scss";

export default function BasicDatePicker(props) {
  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.container}>
      <label htmlFor="typeEl">{props?.label}</label>
      <input
        id="typeEl"
        className={styles.react_calendar}
        {...props}
        type="date"
      />
    </div>
  );
}
