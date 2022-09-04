import React from "react";
import styles from "./styles.module.scss";
import { InputLabel, Select, MenuItem } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
export default function BookingSelect({ label, type, placeholder }) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <select
        className={styles.input}
        size="lg"
        aria-label="Default select example"
        placeholder={placeholder}
      >
        <option>{label}</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </select>
    </div>
  );
}
