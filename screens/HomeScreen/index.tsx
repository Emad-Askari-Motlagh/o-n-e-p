import React from "react";
import styles from "./styles.module.scss";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";
import dynamic from "next/dynamic";

const Restaurant = dynamic(() => import("@/components/RestaurantCard"));

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
      {ALL_RESTAURANTS.map((res, i) => (
        <Restaurant
          location={res.location}
          key={res._id}
          name={res?.name ?? placeHolder}
          description={res?.description ?? placeHolder}
          images={res?.images}
          endPoint={`/${res?.name}`}
          buttonLabel="Begin to order"
          openTimes={res?.openTimes}
          index={i}
        />
      ))}
    </div>
  );
}
