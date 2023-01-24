import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import DatePicker from "@/components/DatePicker";
import Head from "next/head";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useProvideAuth } from "hooks/Context.hook";
import { BiTrash } from "react-icons/bi";
import SucceedMessage from "@/components/Succeed-Message";

export default function Reservation() {
  const [startDate, setStartDate] = useState(new Date());
  const [oldDate, setOldRes] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const { costumerData } = useProvideAuth();
  const { query } = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const url = `/api/reservation/${query.name}`;
  const formRef = useRef();
  useEffect(() => {
    fetchReservations();
    async function fetchReservations() {
      const res = await axios.get(url);
      setOldRes(res.data);
    }
  }, [refetch, query, url]);
  async function reserve(e) {
    e.preventDefault();
    console.log(formRef.current);
    // const res = await axios.post(url, {
    //   date: startDate,
    // });
    // if (res.data) {
    //   setIsSaved(true);
    //   setTimeout(() => {
    //     setRefetch(!refetch);
    //     setIsSaved(false);
    //   }, 1500);
    // }
  }
  async function deleteTheBook(id) {
    const res = await axios.delete(url, { params: { bookId: id } });
    if (res.status === 200) {
      setIsDeleted(true);
      setTimeout(() => {
        setRefetch(!refetch);
        globalThis.location.reload();
        setIsDeleted(false);
      }, 1000);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.calandar_container}>
        <h2>Make your Reservation</h2>
        <div className={styles.table_container}>
          {oldDate.length ? (
            <>
              <h3>Old Reservations:</h3>
              <table className={styles.old_reserved_date}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {oldDate?.map((res, i) => (
                    <tr key={i}>
                      <td>
                        <span className={styles.date}>
                          {new Date(res?.date).toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className={styles.name}>
                          {res?.costumer?.name}
                        </span>
                      </td>
                      <td>
                        <span className={styles.quantity}>4 Persons</span>
                      </td>
                      <td>
                        <span className={styles.quantity}>
                          <BiTrash onClick={() => deleteTheBook(res?._id)} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isDeleted && (
                <SucceedMessage>Your Booking Is Deleted</SucceedMessage>
              )}
            </>
          ) : null}
        </div>
        <form ref={formRef}>
          <div className={styles.first_row}>
            <div>
              <Input type="text" placeholder="Name" label="Customer`s name" />
            </div>
            <DatePicker handleChange={(date: Date) => setStartDate(date)} />
          </div>
          <div className={styles.parent}>
            <Input type="text" placeholder="Antal" label="For how many?" />
          </div>
          <div className={styles.parent}>
            <Input
              placeholder="Description"
              multiline
              maxRows={4}
              label="Description"></Input>
          </div>
          {isSaved && <SucceedMessage>Your Booking Is Accepted</SucceedMessage>}
          <Button type="submit" onClick={reserve}>
            Reserve
          </Button>
        </form>
      </div>
    </div>
  );
}
Reservation.Layout = PrimaryLayout;
