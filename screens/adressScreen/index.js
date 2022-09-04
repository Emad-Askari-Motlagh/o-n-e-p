import React, { useState, useEffect } from "react";
import AddressCard from "components/Address-Card";
import AddAddress from "components/Address-Card/add-address";
import styles from "./address.module.scss";

import { useProvideAuth } from "hooks/Context.hook";

export default function Addresses({ mydata }) {
  const [toggleModal, setModal] = useState(false);

  const { user } = useProvideAuth();

  const data = [];
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Addresses</h1>
      <div className={styles.content}>
        {false ? (
          <span>Loading...</span>
        ) : data ? (
          <>
            <AddressCard data={{ id: user?._id, ...data }} key={1} />
          </>
        ) : (
          <div className={styles.addresses}>
            <button
              className={styles.addAddress}
              onClick={() => setModal(true)}>
              <p>+</p>Add New Address
            </button>
            {user && data && (
              <AddressCard data={{ id: user.uid, ...data }} key={1} />
            )}
          </div>
        )}
      </div>

      {true && <AddAddress closeEvent={() => setModal(false)} />}
    </main>
  );
}
