import React from "react";
import styles from "./styles.module.scss";

export default function ErrorCard({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <span>OBS! </span>
      <span>{children}</span>
    </div>
  );
}
