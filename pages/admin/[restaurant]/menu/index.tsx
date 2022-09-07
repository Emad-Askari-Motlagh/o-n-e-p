import { useMutation, useQuery } from "@apollo/client";
import MenuItem from "components/MenuItem";
import { useRouter } from "next/router";
import React from "react";
import {
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_CATREGORY,
} from "server/graphql/querys/querys.graphql";
import PrimaryLayout from "components/Primary-layout";

import styles from "./menu.module.scss";
import { IoMdAddCircle } from "react-icons/io";
import RestaurantSubItem from "components/RestaurantSubItem";

export default function MenuItems() {
  const { data: restaurantCategorysData } = useQuery(GET_MENU_CATREGORY, {
    variables: { restaurant: "Göteburgare" },
  });

  return (
    <div className={styles.container}>
      <h2>Restaurant Menu</h2>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle color="white" className={styles.add_button} />
      </div>

      <div className={styles.parent}>
        {Array.isArray(restaurantCategorysData?.MenuByCategory) &&
          restaurantCategorysData.MenuByCategory.map((res, i) => (
            <div key={i} className={styles.category_parent}>
              <RestaurantSubItem
                label={res.collectionType}
                endPoint={`${res.collectionType}`}
                image={"/2.webp"}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
MenuItems.Layout = PrimaryLayout;
