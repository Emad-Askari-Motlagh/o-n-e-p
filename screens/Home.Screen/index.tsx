import React, { useEffect, Suspense, useRef, useState, useId } from "react";
import styles from "./styles.module.scss";
import Restaurant from "components/Restaurant";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";

export default function HomeScreen({
  ALL_RESTAURANTS,
}: {
  ALL_RESTAURANTS: IRestaurant[] | null;
}) {
  const placeHolder = "...";
  if (!ALL_RESTAURANTS) {
    return null;
  }

  return (
    <div className={styles.container}>
      {ALL_RESTAURANTS.map((res) => {
        return (
          <Restaurant
            location={res.location}
            key={res._id}
            name={res?.name ?? placeHolder}
            description={res?.description ?? placeHolder}
            images={res?.images}
            endPoint={`/restaurant/${res?.name}`}
            buttonLabel="Begin to order"
            openTimes={res?.openTimes}
          />
        );
      })}
    </div>
  );
}
