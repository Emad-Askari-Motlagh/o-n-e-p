import React, { CSSProperties, ChangeEvent } from "react";
import styles from "./input.module.scss";

type InputProps = {
  required?: boolean;
  error?: string;
  noMargin?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelStyle?: CSSProperties;
  type?: string;
  width?: number | string;
  defaultValue?: string;
};
export default function Input(
  {
    required = true,
    error,
    noMargin,
    placeholder,
    label,
    name,
    onChange,
    labelStyle,
    type,
    width,
    defaultValue,
  }: InputProps,
  props: React.ComponentPropsWithRef<any>
) {
  return (
    <div className={styles.container} style={{ width }}>
      <div className={styles.input_container}>
        <label style={labelStyle}>{label}</label>
        <input
          className={styles.input}
          placeholder={placeholder}
          autoFocus={false}
          onChange={onChange}
          name={name}
          type={type}
          defaultValue={defaultValue}
          {...props}
        />
      </div>
    </div>
  );
}
