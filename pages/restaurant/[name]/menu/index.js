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

export default function Menu() {
  const Router = useRouter();
  const { data, error, loading } = useQuery(GET_MENU_CATREGORY, {
    variables: { restaurant: Router.query?.name },
  });
  const [id] = useId();
  return (
    <div className={styles.container}>
      {error ? (
        <ErrorCard />
      ) : (
        <>
          <motion.label
            initial={{ opacity: 0, y: -200 }}
            animate={{ opacity: 1, y: 0 }}>
            {Router.query?.name}
          </motion.label>
          <div className={styles.items_parent}>
            {(data ? data?.MenuByCategory : Array(6).fill(1)).map(
              (res, index) => (
                <div key={index} className={styles.item_parent}>
                  <RestaurantSubItem
                    label={res.itemName}
                    endPoint={res.itemName}
                    image={"/2.webp"}
                    id={res?.id}
                  />
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

Menu.Layout = PrimaryLayout;
