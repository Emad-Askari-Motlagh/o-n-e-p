import React, { useState } from "react";
import { Calendar } from "react-calendar";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function Reservation() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.container}>
      <div className={styles.calandar_container}>
        <h2>Make your reservation</h2>

        <div className={styles.first_row}>
          <div>
            <Input
              labelStyle={{ color: "black", width: "100%" }}
              type="text"
              placeholder="Name"
              label="Customer`s name"
            />
          </div>

          <div>
            <label>Choose a date</label>
            <DatePicker
              className={styles.date_picker}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className={styles.parent}>
          <Input
            labelStyle={{ color: "black" }}
            type="text"
            placeholder="Antal"
            label="For how many?"
          />
        </div>
        <div className={styles.parent}>
          Description
          <textarea placeholder="Description"></textarea>
        </div>
        <Button>Reserve</Button>
      </div>
    </div>
  );
}
Reservation.Layout = PrimaryLayout;
