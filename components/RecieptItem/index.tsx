import React from "react";
import TableData from "../Table/TableData";
import TableHeader from "../Table/TableHeader";
import styles from "./styles.module.scss";

interface RecieptItem {
  name: string;
  id: string;
  date: string;
  price: string;
}
export default function RecieptItem({ name, id, date, price }: RecieptItem) {
  return (
    <div className={styles.recipet_container}>
      <div className={styles.recipet_container__id}>
        <span>Order Id:</span>
        <span>{id}</span>
      </div>

      <div className={styles.items_parent}>
        <table>
          <tbody>
            <tr>
              <TableHeader>Item</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Price</TableHeader>
            </tr>
            <tr>
              <TableData>{name}</TableData>
              <TableData>{new Date(date).toLocaleString()}</TableData>
              <TableData>{`${price},kr`}</TableData>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
