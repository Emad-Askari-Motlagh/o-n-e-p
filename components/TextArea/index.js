import React, { useState } from "react";
import styles from "./styles.module.scss";

export default function TextArea({ placeholder, width, height }) {
  const [value, setValue] = useState("");
  return (
    <div className={styles.container}>
      <textarea
        className={styles.text_area}
        value={value}
        style={{ width, height }}
        onChange={(v) => setValue(v.target.value)}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
