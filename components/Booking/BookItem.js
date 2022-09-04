import React from "react";
import TextArea from "../TextArea";
import styles from "./styles.module.scss";

export default function BookItem({ value }) {
  return (
    <div className={styles.book_item}>
      <table>
        <tbody>
          <td>{value}</td>
        </tbody>
      </table>
    </div>
  );
}
