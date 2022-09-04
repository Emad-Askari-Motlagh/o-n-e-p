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
  },
  props
) {
  const [focus, setFocus] = useState(false);

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.input_container}>
        {children}
        <AiOutlineSearch fontSize={"44px"} color="#757a7475" />
        <input
          className={styles.input}
          placeholder={placeholder}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={onChange}
          name={name}
          {...props}
        />
      </div>
    </div>
  );
}
