import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./styles.module.scss";
import WithMuiTheme from "../../Hoc/withMuiTheme";

interface CalendarType {
  handleChange: (value: Date) => void;
  label: string;
  value: Date;
}

function Calendar({ handleChange, label, value }: CalendarType) {
  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3}>
          <DesktopDatePicker
            label={label}
            inputFormat="MM/DD/YYYY"
            value={value}
            views={["year", "month", "day"]}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}
export default WithMuiTheme(Calendar);
