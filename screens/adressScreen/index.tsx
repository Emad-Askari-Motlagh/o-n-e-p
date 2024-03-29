import React from "react";
import AddressCard from "@/components/AddressCard";
import AddAddress from "@/components/AddressCard/AddAddress";
import styles from "./address.module.scss";
import AnimatedHeader from "@/components/AnimatedHeader";
import { FaRegAddressCard } from "react-icons/fa";

interface AddressProps {
  data: {
    address: string;
    city: string;
    postNumber: string;
    region: string;
    title: string;
  };
}

export default function Addresses({ data }: AddressProps) {
  return (
    <main className={styles.container}>
      <AnimatedHeader Logo={<FaRegAddressCard color="sandybrown" />}>
        Address
      </AnimatedHeader>
      <AddressCard data={data} />
      {!data && <AddAddress />}
    </main>
  );
}
