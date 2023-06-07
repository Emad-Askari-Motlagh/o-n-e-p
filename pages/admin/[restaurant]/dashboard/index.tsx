import PrimaryLayout from "@/components/Primary-layout";
import { useUser } from "hooks/Context.hook";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Chart from "components/Chart";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALISTICS } from "@/server/graphql/querys/mutations.graphql";
import SelectInput from "@/components/SelectInput";
import React_Calendar from "components/Calendar";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GetAnalisticsMutation,
  GetAnalisticsMutationVariables,
} from "@/server/generated/graphql";

export default function Dashboard() {
  const [sortType, setSortType] = useState(new Date());
  const router = useRouter();
  const {
    user: { data: userData },
  } = useUser();

  const [getAnalistics, { data: analisticsData }] = useMutation<
    GetAnalisticsMutation,
    GetAnalisticsMutationVariables
  >(GET_ANALISTICS);
  useEffect(() => {
    getAnalistics({
      variables: { year: sortType?.getFullYear() },
      onCompleted: (e) => console.log(e),
    });
  }, [sortType, getAnalistics]);

  return (
    <div className={styles.dash_container}>
      <h1>Dashboard</h1>
      <div className={styles.calendar_parent}>
        <React_Calendar
          label="Choose A Year"
          handleChange={(value) => setSortType(value)}
          value={sortType}
        />
      </div>

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
