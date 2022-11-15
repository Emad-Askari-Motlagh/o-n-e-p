import PrimaryLayout from "@/components/Primary-layout";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";

export default function Dashboard() {
  const {
    user: { data: userData },
  } = useProvideAuth();

  return (
    <div className={styles.dash_container}>
      <h1>Dashboard</h1>
      <div className={styles.info_container}>
        <div>
          <span>Oppen times:</span>
          <span>{userData?.CurrentUser?.name}</span>
        </div>
        <span>Address:</span>
        <span>{userData?.CurrentUser?.restaurant.name}</span>
      </div>

      <div className={styles.rapport_container}>
        <div className={styles.rapport_item}>Z-Rapport</div>
        <div className={styles.rapport_item}>X-Rapport</div>
        <div className={styles.rapport_item}>Tottal-Grand</div>
      </div>
    </div>
  );
}
Dashboard.Layout = PrimaryLayout;
