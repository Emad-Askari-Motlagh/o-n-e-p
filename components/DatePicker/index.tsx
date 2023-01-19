import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import styles from "./styles.module.scss";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// When using TypeScript 4.x and above

// When using TypeScript 3.x and below

const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: "success",
      },
    },
  },
});

const isWeekend = (date: Dayjs) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function StaticDatePickerLandscape() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-07"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label="DateTimePicker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
}
