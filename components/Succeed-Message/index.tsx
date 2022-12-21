import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Alert } from "react-bootstrap";
import { BiMessageSquareCheck } from "react-icons/bi";
import { motion } from "framer-motion";

export default function SucceedMessage({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}>
      <div>
        <BiMessageSquareCheck className={styles.icon} />
        <Alert variant="error" className={styles.alert}>
          {children}
        </Alert>
      </div>
    </motion.div>
  );
}
