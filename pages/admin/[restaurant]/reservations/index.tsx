import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/Primary-layout";
import axios from "axios";
import { useRouter } from "next/router";
import { GiConfirmed } from "react-icons/gi";
import { useUser } from "hooks/Context.hook";
import ErrorCard from "@/components/ErrorCard";

const Reservation = () => {
  const [oldDate, setOldRes] = useState([]);
  const [refetch, setRefetch] = useState(true);
  const { query } = useRouter();

  const { user } = useUser();
  const url = `/api/reservation/${query.restaurant}`;
  useEffect(() => {
    if (user.data?.CurrentUser) {
      fetchReservations();
    }

    async function fetchReservations() {
      const res = await axios.get(url);
      setOldRes(res.data);
    }
  }, [refetch, url]);

  return (
    <div className={styles.container}>
      <div className={styles.calandar_container}>
        <h2>Reservations</h2>
        {!user.data?.CurrentUser && <ErrorCard>Please login first</ErrorCard>}
        <div className={styles.table_container}>
          {oldDate.length ? (
            <>
              <h3>Reservations:</h3>
              <table className={styles.old_reserved_date}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Confirmed</th>
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
                        <GiConfirmed className={styles.icon} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
Reservation.Layout = PrimaryLayout;
export default Reservation;
