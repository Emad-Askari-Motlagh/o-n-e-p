import RestaurantSubItem from "@/components/RestaurantSubItem";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { i_MenuCategoryDocument } from "server/mongoSchema/menuCategorySchema";

export default function CategoryItems({
  items,
}: {
  items: [i_MenuCategoryDocument];
}) {
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
