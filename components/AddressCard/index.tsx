import React, { useState } from "react";
import Button from "../Button";
import styles from "./address-card.module.scss";
import UpdateAddress from "./update-address";

interface AddressCardProps {
  data: {
    address: string;
    city: string;
    postNumber: string;
    region: string;
    title: string;
  };
}

export default function AddressCard({ data }: AddressCardProps) {
  const [toggleModal, setModal] = useState(false);
  const { address, city, postNumber, region, title } = data;

  return (
    <div className={styles.container}>
      <h4 className={styles.header}>
        <span>Address</span>
      </h4>
      <hr />
      <div className={styles.addressContainer}>
        <p>
          <span>Full address</span>
          <span>{address}</span>
        </p>
        <p>
          {" "}
          <span>Region</span>
          <span>{region}</span>
        </p>
        <p>
          {" "}
          <span>Post number</span>
          <span>{postNumber}</span>
        </p>
      </div>
      <div className={styles.buttons}>
        <Button width={"40%"} onClick={() => null}>
          Delete
        </Button>
        <Button width={"40%"} onClick={() => setModal(true)}>
          Update
        </Button>
      </div>
      {toggleModal && (
        <UpdateAddress addressData={data} closeEvent={() => setModal(false)} />
      )}
    </div>
  );
}
