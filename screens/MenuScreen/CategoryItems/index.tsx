import RestaurantSubItem from "@/components/RestaurantSubItem";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

export default function CategoryItems({ items }) {
  return (
    <>
      {items.length &&
        items?.map((res, index) => {
          return (
            <div key={index} className={styles.item_parent}>
              <RestaurantSubItem
                key={index}
                label={res.collectionType}
                endPoint={`${res.collectionType}`}
                subCat={res}
                image={"/2.webp"}
              />
            </div>
          );
        })}
    </>
  );
}
