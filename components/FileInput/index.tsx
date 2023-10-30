import useUpload from "hooks/Uploader.hook";
import styles from "./styles.module.scss";
import React, { ChangeEvent, useState } from "react";

export default function FileInput({
  label,
  onChange,
}: {
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  const [items, setItems] = useState([]);

  return (
    <div className={styles.container}>
      <label htmlFor="file_input">{label}</label>
      <input
        onChange={onChange}
        id="file_input"
        name="file_input"
        type="file"></input>
    </div>
  );
}
