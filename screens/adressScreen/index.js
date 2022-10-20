import React, { useState, useEffect } from "react";
import AddressCard from "components/Address-Card";
import AddAddress from "components/Address-Card/add-address";
import styles from "./address.module.scss";

export default function Addresses({ mydata }) {
  return (
    <main className={styles.container}>
      <AddressCard data={mydata} />
      {!mydata && <AddAddress />}
    </main>
  );
}
