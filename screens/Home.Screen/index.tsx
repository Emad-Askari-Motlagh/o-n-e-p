import React, { useEffect, Suspense, useRef, useState, useId } from "react";
import styles from "./styles.module.scss";
import Restaurant from "components/Restaurant";
import axios from "axios";

export default function HomeScreen({ ALL_RESTAURANTS }) {
  const restaurantArray = ALL_RESTAURANTS ? ALL_RESTAURANTS : Array(6).fill(1);
  const [id, setId] = useId();
  const placeHolder = "...";
  if (!ALL_RESTAURANTS?.length) {
    return null;
  }
  useEffect(() => {
    async function sendMAil() {
      const res = await axios.post("/api/contact/sendGrid", {
        sender: "emad.askari@gmail.com",
        email: "emad.askari@gmail.com",
      });
      console.log(res.data);
    }
    sendMAil();
  }, []);

  return (
    <div className={styles.container}>
      {ALL_RESTAURANTS.map((res) => (
        <Restaurant
          setId={setId}
          location={res.location.coordinates}
          key={res._id ?? id}
          name={res?.name ?? placeHolder}
          type={res?.type ?? placeHolder}
          description={res?.description ?? placeHolder}
          images={res?.images}
          endPoint={`/restaurant/${res?.name}`}
          buttonLabel="Begin to order"
        />
      ))}
    </div>
  );
}
