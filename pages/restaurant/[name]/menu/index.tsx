import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "components/Primary-layout";
import RestaurantSubItem from "components/RestaurantSubItem";
import { GET_MENU_CATREGORY } from "@/server/graphql/querys/querys.graphql";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useId } from "react";
import styles from "./menu.module.scss";
import {
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "server/generated/graphql";

export default function Menu() {
  const Router = useRouter();
  const { data, error, loading } = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: { restaurant: Router.query?.name as string },
  });

  return (
    <div className={styles.container}>
      {error ? (
        <ErrorCard>Couldn`t find any item</ErrorCard>
      ) : (
        <>
          <motion.label
            className={styles.label}
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}>
            {Router.query?.name}
          </motion.label>
          <div className={styles.items_parent}>
            {(data?.MenuByCategory
              ? data?.MenuByCategory
              : Array(6).fill(1)
            ).map((res, index) => (
              <div key={index} className={styles.item_parent}>
                <RestaurantSubItem
                  key={index}
                  label={res.itemName}
                  endPoint={res.itemName}
                  image={"/2.webp"}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

Menu.Layout = PrimaryLayout;
