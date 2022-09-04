import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import styles from "./toast.module.css";
import { motion } from "framer-motion";

export default function Top_toast({ message, setShow, show, title }) {
  return (
    <motion.div
      className={styles.main_container}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
        className={styles.container}>
        <Toast.Header>
          <strong className="mr-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </motion.div>
  );
}
