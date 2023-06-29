import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

import Label from "components/Label";
import SummaryItem from "components/SummaryItem";
import Payment from "components/Payment";
import PrimaryLayout from "@/components/PrimaryLayout";
import useOrders from "hooks/Order.hook";
import Warning from "@/components/Warning";
import styles from "./style.module.scss";
import { COSTUMER_ADDRESS } from "@/server/graphql/querys/querys.graphql";
import { PAY } from "@/server/graphql/querys/mutations.graphql";
import { PayMutation, PayMutationVariables } from "@/server/generated/graphql";
import AnimatedHeader from "@/components/AnimatedHeader";
import { IoBagCheckOutline } from "react-icons/io5";

export default function CheckOut() {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // Custom hook to manage orders
  const { addOrder, removeOrder, orders, loading } = useOrders();

  // Fetching customer address
  const { data } = useQuery(COSTUMER_ADDRESS);

  const [paymentError, setPaymentError] = useState(false);

  // Mutation for payment
  const [pay] = useMutation<PayMutation, PayMutationVariables>(PAY, {
    onCompleted: () => {
      setPaymentSuccess(true);
    },
    onError: (err) => {
      // Handle payment error
      setPaymentError(true);
      setTimeout(() => {
        router.reload();
      }, 2000);
    },
  });

  // Calculating the total sum of orders
  const sum = orders?.reduce((acc, item) => {
    const quantity = item.orderQuantity;
    return (acc + item.product.price) * quantity;
  }, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  if (paymentSuccess)
    return <Warning label="Checkout" message="Your order saved sucessefuly" />;
  if (!orders?.length)
    return <Warning label="Checkout" message="You have not any orders" />;

  return (
    <div className={styles.container}>
      {/* Checkout label */}
      <AnimatedHeader Logo={<IoBagCheckOutline />}>Checkout</AnimatedHeader>

      <div className={styles.items_Parent}>
        {loading && (
          // Loading indicator
          <div className={styles.error_Parent}>
            <span style={{ color: "white" }}>Loading...</span>
          </div>
        )}
        {Array.isArray(orders) &&
          orders?.map((res, i) => {
            return (
              // Summary item for each order
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
          })}
      </div>

      {orders && orders?.length && (
        // Displaying the total amount
        <span
          className={styles.total_amount}>{`Total Amount : ${sum},00 kr`}</span>
      )}

      <Payment
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        orders={orders}
        address={data?.Address}
        pay={pay}
        sum={sum}
        paymentError={paymentError}
      />
    </div>
  );
}

// Applying PrimaryLayout as the layout component for this page
CheckOut.Layout = PrimaryLayout;
