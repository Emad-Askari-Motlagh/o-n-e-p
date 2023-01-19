import RestaurantSubItem from "@/components/RestaurantSubItem";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

export default function CategoryItems({ items }) {
  return (
    <div className={styles.container}>
      {items.length &&
        items?.map((res, index) => {
          return (
            <div key={res._id} className={styles.item_parent}>
              <RestaurantSubItem
                key={index}
                label={res.collectionType}
                endPoint={`${res.collectionType}`}
                subCat={res}
                image={res.image}
              />
            </div>
          );
        })}
    </div>
  );
}
