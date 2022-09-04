import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar_react from "react-calendar";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";
import BookItem from "./BookItem";
import BookingForm from "./BookingForm";

function Booking({ COSTUMER, RESERVATION }) {
  const [value, setValue] = useState(new Date());
  const [day, setDay] = useState(new Date());
  const [reservation, setReservation] = useState();
  const [oldBooking, setOldBooking] = useState();
  const Router = useRouter();
  const times = [
    { capacity: 20, time: [{ time: "14-16", available: true }] },
    { capacity: 20, time: [{ time: "16-18", available: true }] },
    { capacity: 20, time: [{ time: "18-20", available: true }] },
    { capacity: 20, time: [{ time: "20-22", available: true }] },
    { capacity: 20, time: [{ time: "18-20", available: true }] },
    { capacity: 20, time: [{ time: "18-20", available: true }] },
    { capacity: 20, time: [{ time: "18-20", available: true }] },
    { capacity: 20, time: [{ time: "18-20", available: true }] },
  ];
  function getDaysInMonth(year, month) {
    const days = new Date(year, month, 0).getDate();
    const allDays = [];
    for (let i = 0; i <= days; i++) {
      allDays.push({
        day: i,
        time: times
          .find((res, index) => i === index)
          ?.time.map((rr) => rr.time),
      });
    }
    return allDays;
  }
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth() + 1;

  useEffect(() => {
    setValue(null);
    //Get the old booking
    async function getBooking() {
      if (!Router.query.name && !COSTUMER) {
        return;
      }
      const oldBook = await axios.get(`/api/reservation`, {
        params: { costumerId: COSTUMER, restaurant: Router.query.name },
      });
      setOldBooking(oldBook.data.date);
      if (oldBook) {
        return oldBook;
      }
    }
    getBooking();
  }, [Router.query.name, COSTUMER]);

  async function submitTheDate() {
    if (Router.query.name && COSTUMER && value) {
      if (!reservation) {
        const res = await axios.post("/api/reservation", {
          restaurant: Router.query.name,
          costumer: COSTUMER,
          date: value,
        });
        if (res.data) {
          setReservation(res.data);
          console.log(res.data);
        }
      }
    }
  }
  return (
    <div id={"44"} className={styles.container}>
      <h3>BOOKING</h3>
      <BookingForm />
      {value && <div className={styles.date_view}>{value.toDateString()}</div>}
      {/* <Times times={getDaysInMonth(currentYear, currentMonth)} /> */}
      {reservation && (
        <div
          className={
            styles.date_view
          }>{`Your booking added in : ${day.toDateString()}`}</div>
      )}
      {oldBooking && (
        <div className={styles.date_view}>
          <BookItem
            value={`OBS! You have alreaedy a booking on : ${new Date(
              oldBooking
            )}`}
          />
        </div>
      )}
      <Button width={"50%"} onClick={submitTheDate}>
        {oldBooking ? "Rebook" : "Booka nu"}
      </Button>
    </div>
  );
}
export default Booking;
