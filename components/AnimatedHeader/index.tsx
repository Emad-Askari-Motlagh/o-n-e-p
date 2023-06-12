import React from "react";
import { motion } from "framer-motion";
import styles from "./AnimatedHeader.module.scss";

function AnimatedHeader({ children }) {
  return (
    <motion.h1
      className={styles.header_con}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}>
      {children}
    </motion.h1>
  );
}

export default AnimatedHeader;
