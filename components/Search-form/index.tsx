import { motion } from "framer-motion";
import React from "react";
import Input from "./Input";
import styles from "./styles.module.scss";

interface SearchProps {
  onSubmit?: MouseEvent;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  label: string;
}
export default function Search_form({
  onSubmit,
  onChange,
  label,
}: SearchProps) {
  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}>
      <Input
        placeholder={label}
        label={label}
        name={"searchInput"}
        onChange={onChange}
      />
    </motion.div>
  );
}
