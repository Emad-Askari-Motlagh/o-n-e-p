import React, { useEffect, useState } from "react";
import Label from "components/Label";
import SummaryItem from "components/SummaryItem";
import Payment from "components/Payment";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/Order.hook";

import styles from "./style.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import {
  COSTUMER_ADDRESS,
  GET_ORDERS_CONSTANTLY,
  GET_PAYED_ORDERS,
} from "@/server/graphql/querys/querys.graphql";
import { PAY } from "@/server/graphql/querys/mutations.graphql";
import { useRouter } from "next/router";

export default function CheckOut() {
  const { addOrder, removeOrder, orders, loading } = useOrders();
  const { data } = useQuery(COSTUMER_ADDRESS);
  const router = useRouter();
  const [pay] = useMutation(PAY, {
    onCompleted: () => {
      router.push(`/restaurant/${router.query.name}`);
    },
    onError: (err) => {
      console.log(err);
    },
    refetchQueries: [
      {
        query: GET_ORDERS_CONSTANTLY,
        //Make sure that variables are the same ones as the ones you used to get GET_USER_CART data. If it is different, it wont work. Check if your variables are the same on useQuery you called before and this query
        variables: { restaurant: router.query.name },
      },
      {
        query: GET_PAYED_ORDERS,
        //Make sure that variables are the same ones as the ones you used to get GET_USER_CART data. If it is different, it wont work. Check if your variables are the same on useQuery you called before and this query
        variables: { restaurant: router.query.name },
      },
    ],
  });
  interface CurrentValue {
    orderQuantity?: number;
    product?: { price: number };
  }

  //Compute total payment amount
  function countSum() {
    if (!orders) {
      return;
    }
    const initialValue = 0;
    if (Array.isArray(orders)) {
      const sumWithInitial = orders?.reduce((previousValue, currentValue) => {
        if (currentValue) {
          return (
            previousValue +
              currentValue.product.price * currentValue.orderQuantity,
            initialValue
          );
        }
      });
      return sumWithInitial;
    } else {
      return "...";
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!orders?.length)
    return (
      <div className={styles.container}>
        <Label label_name={"Checkout"} />
        <div className={styles.error_Parent}>
          <span style={{ color: "white" }}>OBS!</span>
          <span style={{ color: "white" }}>You have not any orders</span>
        </div>
      </div>
    );
  return (
    <div className={styles.container}>
      <Label label_name={"Checkout"} />
      <div className={styles.items_Parent}>
        {loading && (
          <div className={styles.error_Parent}>
            <span style={{ color: "white" }}>Loading...</span>
          </div>
        )}
        {Array.isArray(orders) &&
          orders?.map((res, i) => {
            return (
              <SummaryItem
                key={res?._id}
                id={res?.product._id}
                description={res?.product.description}
                name={res?.product?.name}
                ImageSrc={"/1.webp"}
                quantity={res.orderQuantity}
                removeOrder={removeOrder}
                addOrder={addOrder}
                price={res?.product.price}
              />
            );
          })}{" "}
      </div>
      {orders && orders?.length && (
        <span
          className={
            styles.total_amount
          }>{`Total Amount : ${countSum()},00 kr`}</span>
      )}
      <Payment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        orders={orders}
        address={data?.Address}
        pay={pay}
      />
    </div>
  );
}
CheckOut.Layout = PrimaryLayout;
