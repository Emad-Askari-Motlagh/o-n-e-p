import React from "react";
import Button from "../Button";
import Input from "../Input";
import styles from "./style.module.scss";

export default function Form({ children, onSubmit }) {
  return (
    <div className={styles.form_parent}>
      <form className={styles.form}>
        {children}
        <Input minRows={4} multiline placeholder="Extra description"></Input>
      </form>
    </div>
  );
}
