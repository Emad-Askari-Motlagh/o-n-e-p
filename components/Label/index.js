import React from "react";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

export default function Label({ label_name }) {
  return (
    <div className={styles.container}>
      <motion.label
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}
      >
        {label_name}
      </motion.label>
    </div>
  );
}
