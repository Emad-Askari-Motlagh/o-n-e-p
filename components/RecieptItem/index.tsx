import React from "react";
import TableData from "../Table/TableData";
import TableHeader from "../Table/TableHeader";
import styles from "./styles.module.scss";

export default function RecieptItem({ name, id, date, price }) {
  return (
    <div className={styles.recipet_container}>
      <div className={styles.items_parent}>
        <table>
          <tbody>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Item</TableHeader>
              <TableHeader>Date</TableHeader>
              <TableHeader>Price</TableHeader>
            </tr>
            <tr>
              <TableData>{id}</TableData>
              <TableData>{name}</TableData>
              <TableData>{new Date(date).toLocaleString()}</TableData>
              <TableData>{`${price},kr`}</TableData>
            </tr>
          </tbody>
        </table>

        {/* <span>{id}</span>
        <span>{name}</span>
        <span>{new Date(date).toLocaleString()}</span>
        <span>{`${price},kr`}</span> */}
      </div>
    </div>
  );
}
