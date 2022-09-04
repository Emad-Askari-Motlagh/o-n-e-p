import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import styles from "./input.module.scss";
import { AiOutlineSearch } from "react-icons/ai";

export default function Input(
  {
    required = true,
    error,
    noMargin,
    placeholder,
    label,
    children,
    name,
    onChange,
    labelStyle,
    type,
    width,
  },
  props
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
          {...props}
        />
      </div>
    </div>
  );
}
