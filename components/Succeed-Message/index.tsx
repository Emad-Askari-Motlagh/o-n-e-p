import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Alert } from "react-bootstrap";
import { BiMessageSquareCheck } from "react-icons/bi";

export default function SucceedMessage({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <div>
        <BiMessageSquareCheck className={styles.icon} />
        <Alert variant="error" className={styles.alert}>
          {children}
        </Alert>
      </div>
    </div>
  );
}
