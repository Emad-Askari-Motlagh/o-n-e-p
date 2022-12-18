import PrimaryLayout from "@/components/Primary-layout";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Chart from "components/Chart";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALISTICS } from "@/server/graphql/querys/mutations.graphql";
import SelectInput from "@/components/SelectInput";
import React_Calendar from "components/Calendar";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [sortType, setSortType] = useState(new Date().getFullYear());
  const router = useRouter();
  const {
    user: { data: userData },
  } = useProvideAuth();

  const [getAnalistics, { data: analisticsData }] = useMutation(
    GET_ANALISTICS,
    {
      onCompleted: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );
  useEffect(() => {
    getAnalistics({
      variables: { year: parseInt(sortType) },
      onCompleted: (e) => console.log(e),
    });
  }, [sortType]);

  return (
    <div className={styles.dash_container}>
      <h1>Dashboard</h1>
      <div className={styles.calendar_parent}>
        <React_Calendar
          label="Choose A Year"
          onChange={(e) => setSortType(new Date(e.target.value)?.getFullYear())}
        />
      </div>

      <SelectInput
        name="Sort result"
        label="Sort by..."
        placeholder="Choose a sort method"
        value={[2022, 2021, 2023]}
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
        <Link href={`/admin/${router.query.restaurant}/rapport`}>
          <a className={styles.rapport_item}>Z-Rapport</a>
        </Link>
        <Link href={`/admin/${router.query.restaurant}/rapport`}>
          <a className={styles.rapport_item1}>X-Rapport</a>
        </Link>
        <Link href={`/admin/${router.query.restaurant}/rapport`}>
          <a className={styles.rapport_item2}>Tottal-Grand</a>
        </Link>
      </div>
    </div>
  );
}
Dashboard.Layout = PrimaryLayout;
