import React from "react";
import Input from "./Input";
import styles from "./styles.module.scss";

interface SearchProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
  children?: React.ReactNode;
}
export default function Search_form({ onChange, label }: SearchProps) {
  return (
    <div className={styles.container}>
      <Input
        placeholder={label}
        label={label}
        name={"searchInput"}
        onChange={onChange}
      />
    </div>
  );
}
