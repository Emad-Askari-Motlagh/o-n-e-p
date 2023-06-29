import React, { CSSProperties, ChangeEvent } from "react";
import style from "./input.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Mui_Theme from "../../Hoc/withMuiTheme";
import Input from "@mui/material/Input";

type InputProps = {
  required?: boolean;
  error?: string;
  noMargin?: boolean;
  placeholder?: string;
  label?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelStyle?: CSSProperties;
  type?: string;
  width?: number | string;
  defaultValue?: string;
  multiline?: boolean;
  maxRows?: number;
  minRows?: number;
  value?: string | number;
  id?: string;
};
function InputComponent({
  required = true,
  error,
  noMargin,
  placeholder,
  label,
  name,
  onChange,
  labelStyle,
  type,
  width,
  defaultValue,
  multiline,
  maxRows,
  minRows,
  value,
  id,
}: InputProps) {
  return (
    <TextField
      value={value}
      helperText={`Please enter your ${placeholder}`}
      id={id}
      label={name}
      placeholder={placeholder}
      autoFocus={false}
      onChange={onChange}
      name={name}
      type={type}
      defaultValue={defaultValue}
      multiline={multiline}
      minRows={minRows}
      InputProps={{
        className: style.container,
      }}
    />
  );
}
export default Mui_Theme(InputComponent);
