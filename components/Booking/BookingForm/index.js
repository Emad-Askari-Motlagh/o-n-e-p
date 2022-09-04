import React, { useState } from "react";
import BookingInput from "../BookingInput";
import BookingSelect from "../BookingSelect";
import styles from "./styles.module.scss";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
export default function BookingForm() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <BookingSelect
          type="time"
          label={"Choose a time"}
          placeholder={"Time"}
        />
        <div className={styles.date_picker_parent}>
          <label>Choose a date</label>
          <DatePicker
            calendarStartDay={new Date().getDay()}
            className={styles.date_picker}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <BookingInput
          type="email"
          label={"Email Address"}
          placeholder={"Email"}
        />

        <BookingInput type="number" label={"People"} placeholder={"Quantity"} />
        <BookingInput
          type="phone"
          label={"Phone Number"}
          placeholder={"Number"}
        />
        <textarea placeholder="Description"></textarea>
      </form>
    </div>
  );
}
