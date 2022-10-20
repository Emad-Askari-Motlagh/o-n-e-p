import React, { useState, useEffect } from "react";
import Button from "../Button";
import styles from "./address-card.module.scss";
import UpdateAddress from "./update-address";

export default function AddressCard({ data }) {
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
        <Button width={"40%"} className={styles.delete} onClick={() => null}>
          Delete
        </Button>
        <Button
          width={"40%"}
          className={styles.update}
          onClick={() => setModal(true)}>
          Update
        </Button>
      </div>
      {toggleModal && (
        <UpdateAddress addressData={data} closeEvent={() => setModal(false)} />
      )}
    </div>
  );
}
