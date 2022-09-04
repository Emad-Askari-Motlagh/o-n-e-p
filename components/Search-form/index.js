import { motion } from "framer-motion";
import React from "react";
import Input from "./Input";
import styles from "./styles.module.scss";

export default function Search_form({ onSubmit, onChange }) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Input
        placeholder="Hitta din restaurang"
        label={"Restaurang"}
        name={"searchInput"}
        onChange={onChange}
      />
    </motion.div>
  );
}
