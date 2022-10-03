import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";

export default function SelectInput({
  value,
  label,
  onSelect,
  name,
}: {
  value: string[];
  label: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select id={name} name={name} onChange={onSelect}>
        {value.map((res, i) => {
          return <option key={i}>{res}</option>;
        })}
      </select>
    </div>
  );
}
