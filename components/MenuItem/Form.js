import React from "react";
import styles from "./style.module.scss";

export default function Form({ children }) {
  return (
    <div className={styles.form_parent}>
      <form className={styles.form}>
        {children} <textarea placeholder="Extra description"></textarea>
      </form>
    </div>
  );
}
