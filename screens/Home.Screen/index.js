import React, { useEffect, Suspense, useRef, useState, useId } from "react";
import styles from "./styles.module.scss";
import Restaurant from "components/Restaurant";

export default function HomeScreen({ ALL_RESTAURANTS }) {
  const restaurantArray = ALL_RESTAURANTS ? ALL_RESTAURANTS : Array(6).fill(1);
  const [id, setId] = useId();
  const placeHolder = "...";
  if (!ALL_RESTAURANTS?.length) {
    return null;
  }

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
