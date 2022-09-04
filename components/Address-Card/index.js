import React, { useState } from "react";
import Button from "../Button";
import styles from "./address-card.module.scss";
import UpdateAddress from "./update-address";

export default function AddressCard({ data }) {
  const [toggleModal, setModal] = useState(false);
  const { id, title, full_address, zipcode, region, city } = data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4>{title || "Title"}</h4>
      </div>
      <hr />
      <div className={styles.addressContainer}>
        <p>{full_address || "Full address"}</p>
        <p>{city + " / " + zipcode || "City / Zipcode"}</p>
        <p>{region || "Region"}</p>
      </div>
      <div className={styles.buttons}>
        <Button width={"40%"} className={styles.delete} onClick={() => null}>
          Delete
        </Button>
        <Button
          width={"40%"}
          className={styles.update}
          onClick={() => setModal(true)}
        >
          Update
        </Button>
      </div>
      {toggleModal && (
        <UpdateAddress addressData={data} closeEvent={() => setModal(false)} />
      )}
    </div>
  );
}
