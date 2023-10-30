import MenuItem from "components/MenuItem";
import PrimaryLayout from "@/components/PrimaryLayout";
import useOrders from "hooks/Order.hook";
import { GET_MENU_ITEM_BY_CATREGORY } from "server/graphql/querys/querys.graphql";
import { useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Form from "components/MenuItem/Form";
import ChoisesCard from "components/MenuItem/ChoisesCard";
import Selection from "components/Selection";
import {
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
} from "@/server/generated/graphql";

export default function Items() {
  const Router = useRouter();

  const {
    orders,
    removeOrder,
    addOrder,
    loading: orderLoading,
    AdminOrders,
  } = useOrders();

  const item = Router.query?.category[0];
  const restaurant = Router.query?.name;
  const { data, loading, error } = useQuery<
    MenuItemByCategoryQuery,
    MenuItemByCategoryQueryVariables
  >(GET_MENU_ITEM_BY_CATREGORY, {
    variables: {
      category: item as string,
      restaurant: restaurant as string,
    },
  });

  //Function to Compute final quantity based on co§;stumers Orders
  function countQuantity(
    id: number,
    orders: [{ orderQuantity: number; product: { _id: number } }]
  ) {
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
        {item}
      </motion.label>

      <div className={styles.items_container}>
        {Array.isArray(data?.MenuItemByCategory) &&
          !loading &&
          data?.MenuItemByCategory.map((res, i) => (
            <MenuItem
              key={res?._id || i}
              id={res?._id}
              description={res?.description}
              name={res?.name}
              ImageSrc={"/1.webp"}
              addOrder={() =>
                addOrder({
                  variables: { productId: res._id },
                })
              }
              removeOrder={() =>
                removeOrder({
                  variables: { productId: res._id },
                })
              }
              price={res.price}
              quantity={countQuantity(res._id, orders)}
              itemsChildren={
                <>
                  <Form>
                    <Selection />
                  </Form>
                  <ChoisesCard costumerExtra={"costumerExtra"} />
                </>
              }
            />
          ))}
      </div>
    </div>
  );
}

Items.Layout = PrimaryLayout;
