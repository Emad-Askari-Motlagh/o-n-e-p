import React, { useEffect, useState } from "react";
import Label from "components/Label";
import SummaryItem from "components/SummaryItem";
import Payment from "components/Payment";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/useOrder";

import styles from "./style.module.scss";

export default function CheckOut() {
  const { addOrder, removeOrder, orders, loading, newUi } = useOrders();

  //Compute total payment amount
  function countSum() {
    const initialValue = 0;
    if (orders?.length) {
      const sumWithInitial = orders.reduce(
        (previousValue, currentValue) =>
          previousValue +
          currentValue.product.price * currentValue.orderQuantity,
        initialValue
      );
      return sumWithInitial;
    } else {
      return "...";
    }
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!orders?.length && !loading)
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
        {orders?.length &&
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
      <span
        className={
          styles.total_amount
        }>{`Total Amount : ${countSum()},00 kr`}</span>
      <Payment isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
CheckOut.Layout = PrimaryLayout;
