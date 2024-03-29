import React, { CSSProperties } from "react";
import { motion } from "framer-motion";
import styles from "./framer.module.scss";

export default function Header_animations({
  text,
  style,
}: {
  text: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={styles.header}
      initial={{ y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      style={style}>
      {text}
    </motion.div>
  );
}
