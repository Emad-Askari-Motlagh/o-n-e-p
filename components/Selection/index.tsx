import React, { ReactEventHandler, SyntheticEvent } from "react";
import styles from "./styles.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import withMuiTheme from "Hoc/withMuiTheme";
import { InputLabel } from "@mui/material";

function Selection({
  options,
  onChange,
  value,
  label,
  onOpen,
  onSelect,
}: {
  options: { name: string }[];
  onChange: (event: SelectChangeEvent) => void;
  value: string;
  label: string;
  onSelect?: ReactEventHandler<HTMLDivElement>;
  onOpen?: (event: SyntheticEvent<Element, Event>) => void;
}) {
  return (
    <div className={styles.container}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        placeholder="ok"
        onOpen={onOpen}
        style={{ minWidth: "300px" }}
        onSelect={onSelect}
        onChange={onChange}>
        {options?.length &&
          options.map((res, i) => {
            return (
              <MenuItem key={i} value={res.name}>
                {res.name}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
}
export default withMuiTheme(Selection);
