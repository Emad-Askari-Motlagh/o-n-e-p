import MenuItem from "components/MenuItem";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/useOrder";
import { GET_MENU_ITEM_BY_CATREGORY } from "server/graphql/querys/querys.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

export default function Items() {
  const Router = useRouter();

  const {
    orderData,
    orders,
    removeOrder,
    addOrder,
    loading: orderLoading,
  } = useOrders();

  const { data, loading, error } = useQuery(GET_MENU_ITEM_BY_CATREGORY, {
    variables: { category: Router.query?.item, restaurant: Router.query?.name },
  });

  //Function to Compute final quantity based on co§;stumers Orders
  function countQuantity(id, orders) {
    if (Array.isArray(orders) && id) {
      const result = orders.find((ress) => ress.product?._id === id);
      if (result) {
        return result.orderQuantity;
      } else {
        return 0;
      }
    }
  }

  return (
    <div className={styles.container}>
      <motion.label
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.header}>
        {Router.query?.item}
      </motion.label>
      <div className={styles.items_container}>
        {Array.isArray(data?.MenuItemByCategory) &&
          !loading &&
          data.MenuItemByCategory.map((res, i) => (
            <MenuItem
              key={res?._id || i}
              id={res?._id}
              description={res?.description}
              name={res?.name}
              ImageSrc={"/1.webp"}
              restaurant={Router.query.name}
              addOrder={addOrder}
              removeOrder={removeOrder}
              price={res.price}
              quantity={countQuantity(res._id, orders)}
            />
          ))}
      </div>
    </div>
  );
}

Items.Layout = PrimaryLayout;
