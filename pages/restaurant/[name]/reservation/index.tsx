import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useProvideAuth } from "hooks/Context.hook";

export default function Reservation() {
  const [startDate, setStartDate] = useState(new Date());
  const [oldDate, setOldRes] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const { costumerData } = useProvideAuth();
  const { query } = useRouter();
  useEffect(() => {
    fetchReservations();
    async function fetchReservations() {
      const res = await axios.get(`/api/reservation/${query.name}`);
      setOldRes(res.data);
    }
  }, [refetch, query]);
  async function reserve() {
    if (!costumerData.data?.Costumer) {
      return;
    }
    const data = await axios.post(`/api/reservation/${query.name}`, {
      date: startDate,
    });
    setRefetch(!refetch);
  }

  return (
    <div className={styles.container}>
      <div className={styles.calandar_container}>
        <h2>Make your Reservation</h2>
        <div>
          <h3>Old Reservations:</h3>
          {oldDate?.length &&
            oldDate?.map((res, i) => (
              <div style={{ color: "wheat" }} key={i}>
                {res}
              </div>
            ))}
        </div>

        <div className={styles.first_row}>
          <div>
            <Input type="text" placeholder="Name" label="Customer`s name" />
          </div>

          <div>
            <label>Choose a date</label>
            <DatePicker
              className={styles.date_picker}
              selected={startDate}
              onDayMouseEnter={(date: Date) => setStartDate(date)}
            />
          </div>
        </div>
        <div className={styles.parent}>
          <Input type="text" placeholder="Antal" label="For how many?" />
        </div>
        <div className={styles.parent}>
          Description
          <textarea placeholder="Description"></textarea>
        </div>
        <Button onClick={reserve}>Reserve</Button>
      </div>
    </div>
  );
}
Reservation.Layout = PrimaryLayout;
