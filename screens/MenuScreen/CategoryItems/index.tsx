import RestaurantSubItem from "@/components/RestaurantParentCard";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { i_MenuCategoryDocument } from "server/mongoSchema/menuCategorySchema";

export default function CategoryItems<T>({ items }: { items: T[] }) {
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
                image={res.image}
              />
            </div>
          );
        })}
    </div>
  );
}
