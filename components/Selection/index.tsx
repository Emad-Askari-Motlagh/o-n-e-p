import React from "react";
import styles from "./styles.module.scss";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import withMuiTheme from "Hoc/withMuiTheme";
import { InputLabel } from "@mui/material";

function Selection({
  options,
  onChange,
  value,
  label,
}: {
  options: { value: string }[];
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  label: string;
}) {
  return (
    <div className={styles.container}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        style={{ minWidth: "300px" }}
        onOpen={() => options.shift()}
        onChange={onChange}>
        {options.map((res, i) => {
          return (
            <MenuItem key={i} value={res.value}>
              {res.value}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
}
export default withMuiTheme(Selection);
