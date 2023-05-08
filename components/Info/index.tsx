import React from "react";
import { Alert, Snackbar } from "@mui/material";
import styles from "./styles.module.scss";
export default function Info({ children }: { children: string }) {
  return (
    <div className={styles["info-wrapper"]}>
      <Alert severity="info">{children}</Alert>
    </div>
  );
}
