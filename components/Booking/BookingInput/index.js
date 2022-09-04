import React from "react";
import styles from "./styles.module.scss";
import {
  InputLabel,
  Select,
  MenuItem,
  Input,
  TextField,
  ThemeVars,
  ThemeProvider,
} from "@mui/material";
import { useTheme, createTheme } from "@mui/material/styles";
import { InputGroup } from "react-bootstrap";
export default function BookingInput({ label, type, placeholder }, props) {
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <input
        {...props}
        id="basic-addon1"
        label={label}
        className={styles.input}
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
