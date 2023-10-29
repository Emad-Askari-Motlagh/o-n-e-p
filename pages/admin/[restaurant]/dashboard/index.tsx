import PrimaryLayout from "@/components/PrimaryLayout";
import useAuth from "hooks/Auth.hook";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALISTICS } from "@/server/graphql/querys/mutations.graphql";
import React_Calendar from "components/Calendar";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  GetAnalisticsMutation,
  GetAnalisticsMutationVariables,
} from "@/server/generated/graphql";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { AiOutlineDashboard } from "react-icons/ai";
import dynamic from "next/dynamic";
import SimpleLoading from "@/components/SimpleLoading";

const Chart = dynamic(() => import("@/components/Chart"), {
  loading: () => <SimpleLoading />,
});
export default function Dashboard() {
  const [sortType, setSortType] = useState(new Date());
  const router = useRouter();
  const {
    user: { data: userData },
  } = useAuth();

  const [getAnalistics, { data: analisticsData }] = useMutation<
    GetAnalisticsMutation,
    GetAnalisticsMutationVariables
  >(GET_ANALISTICS);

  useEffect(() => {
    getAnalistics({
      variables: {
        year: sortType?.getFullYear(),
      },
    });
  }, [sortType]);

  return (
    <div className={styles.dash_container}>
      <Head>
        <title>Dashboard - Admin</title>
        <meta name="description" content="Admin`s Dashboard" />
      </Head>
      <AnimatedHeader Logo={<AiOutlineDashboard />}>Dashboard</AnimatedHeader>
      <div className={styles.calendar_parent}>
        <React_Calendar
          label="Choose A Year"
          handleChange={(value: Date) => {
            setSortType(new Date(value));
          }}
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
