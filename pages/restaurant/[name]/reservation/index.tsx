import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import DatePicker from "@/components/DatePicker";
import Head from "next/head";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "hooks/Context.hook";
import { BiTrash } from "react-icons/bi";
import SucceedMessage from "@/components/Succeed-Message";
import ErrorCard from "@/components/ErrorCard";

const Reservation = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [oldDate, setOldRes] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState<number>();
  const [bookingName, setBookingName] = useState("");
  const [bookingError, setBookingError] = useState("");
  const { query } = useRouter();
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const url = `${process.env.SERVER_LINK}/api/reservation/${query.name}`;
  const formRef = useRef();
  const { costumerData } = useUser();
  useEffect(() => {
    fetchReservations();
    async function fetchReservations() {
      try {
        const res = await axios.get(url);
        setOldRes(res.data);
      } catch (err) {
        setBookingError("There was an error");
        return;
      }
    }
  }, [refetch, query, url]);
  async function reserve(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setBookingError("");
    if (!costumerData.data) {
      return;
    }
    try {
      const res = await axios.post(url, {
        date: startDate,
        description,
        quantity,
        email: costumerData?.data.Costumer.email,
        name: bookingName,
      });

      if (res.data) {
        setIsSaved(true);
        setTimeout(() => {
          setRefetch(!refetch);
          setIsSaved(false);
          globalThis.location.reload();
        }, 1000);
      } else {
        throw new Error("There was an error");
      }
    } catch (error: any) {
      setBookingError(error?.Message ?? "There was an error");
    }
  }
  async function deleteTheBook(id: string) {
    try {
      const res = await axios.delete(url, { params: { bookId: id } });
      setTimeout(() => {
        setRefetch(!refetch);
        globalThis.location.reload();
        setIsDeleted(false);
      }, 1000);
    } catch (error) {
      setBookingError("Unexpected error");
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Reservation Page</title>
        <meta name="description" content="Reservation page" />
      </Head>
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
                        <span className={styles.name}>{res?.name}</span>
                      </td>
                      <td>
                        <span className={styles.quantity}>4 Persons</span>
                      </td>
                      <td>
                        <BiTrash
                          className={styles.icon}
                          onClick={() => deleteTheBook(res?._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isDeleted && (
                <SucceedMessage>Your Booking Is Deleted</SucceedMessage>
              )}
              {bookingError && <ErrorCard>bookingError</ErrorCard>}
            </>
          ) : null}
        </div>
        <form ref={formRef}>
          <Input
            type="text"
            placeholder="Name"
            label="Customer`s name"
            onChange={(e) => setBookingName(e.target.value)}
          />
          <div style={{ margin: "0.2rem auto", width: "100%" }}>
            <DatePicker handleChange={(date: Date) => setStartDate(date)} />
          </div>

          <Input
            type="number"
            placeholder="Antal"
            label="For how many?"
            onChange={(e) => setQuantity(e.target.value)}
          />

          <Input
            placeholder="Description"
            multiline
            minRows={4}
            width="100%"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}></Input>

          {isSaved && <SucceedMessage>Your Booking Is Accepted</SucceedMessage>}
          <Button width="80%" type="submit" onClick={reserve}>
            Reserve
          </Button>
        </form>
      </div>
    </div>
  );
};
Reservation.Layout = PrimaryLayout;
export default Reservation;
