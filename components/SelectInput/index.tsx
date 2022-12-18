import React, { ChangeEvent } from "react";
import styles from "./styles.module.scss";

export default function SelectInput({
  value,
  label,
  onSelect,
  name,
  placeholder,
}: {
  value: string[] | Number[];
  label: string;
  onSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  name: string;
}) {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <select
        placeholder={placeholder}
        id={name}
        name={name}
        onChange={onSelect}>
        {value?.map((res, i) => {
          return <option key={i}>{res}</option>;
        })}
      </select>
    </div>
  );
}
