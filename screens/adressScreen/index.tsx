import React from "react";
import AddressCard from "components/Address-Card";
import AddAddress from "@/components/Address-Card/AddAddress";
import styles from "./address.module.scss";

interface AddressesProps {
  mydata: any;
}

export default function Addresses({ mydata }: AddressesProps) {
  return (
    <main className={styles.container}>
      <AddressCard data={mydata} />
      {!mydata && <AddAddress />}
    </main>
  );
}
