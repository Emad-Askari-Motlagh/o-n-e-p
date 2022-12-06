import PrimaryLayout from "@/components/Primary-layout";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Chart from "components/Chart";
import { useQuery } from "@apollo/client";
import { GET_ANALISTICS } from "@/server/graphql/querys/querys.graphql";
import SelectInput from "@/components/SelectInput";

export default function Dashboard() {
  const [sortType, setSortType] = useState("year");
  const {
    user: { data: userData },
  } = useProvideAuth();
  const { data: analisticsData, refetch } = useQuery(GET_ANALISTICS, {
    onCompleted: (data) => {
      console.log(data);
    },
  });
  useEffect(() => {
    refetch();
  }, [sortType]);

  return (
    <div className={styles.dash_container}>
      <h1>Dashboard</h1>
      <SelectInput
        name="Sort result"
        label="Sort by..."
        placeholder="Choose a sort method"
        value={["year", "month", "day"]}
        onSelect={(e) => setSortType(e.target.value)}></SelectInput>
      <div className={styles.info_container}>
        <div>
          <span>Oppen times: 12 - 14</span>
        </div>
        <div>
          <span>User: </span>
          <span>{userData?.CurrentUser?.name}</span>
        </div>

        <div>
          <span>Address: Nordgordsgatan 10</span>
        </div>

        <div>
          <span>Restaurant: {userData?.CurrentUser?.restaurant.name}</span>
        </div>
      </div>
      <Chart data={analisticsData} sortType={sortType} />

      <div className={styles.rapport_container}>
        <div className={styles.rapport_item}>Z-Rapport</div>
        <div className={styles.rapport_item1}>X-Rapport</div>
        <div className={styles.rapport_item2}>Tottal-Grand</div>
      </div>
    </div>
  );
}
Dashboard.Layout = PrimaryLayout;
