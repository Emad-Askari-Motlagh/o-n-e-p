import React, { useState } from "react";
import { FaSearchengin } from "react-icons/fa";
import styles from "./input.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import type { AppProps, AppInitialProps } from "next/app";

interface InputProps {
  required?: boolean;
  error?: string;
  noMargin?: boolean;
  placeholder?: string;
  label: string;
  children?: React.ReactNode;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
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
  }: InputProps,
  props: any
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
