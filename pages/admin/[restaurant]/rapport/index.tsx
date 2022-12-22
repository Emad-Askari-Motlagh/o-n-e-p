import PrimaryLayout from "@/components/Primary-layout";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Chart from "components/Chart";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ANALISTICS } from "@/server/graphql/querys/mutations.graphql";
import SelectInput from "@/components/SelectInput";
import React_Calendar from "components/Calendar";

export default function Dashboard() {
  const [sortType, setSortType] = useState("year");
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
        {" "}
        <React_Calendar />
      </div>

      <SelectInput
        name="Sort result"
        label="Sort by..."
        placeholder="Choose a sort method"
        value={["year", "month", "day"]}
        onSelect={(e) => setSortType(e.target.value)}></SelectInput>
      <SelectInput
        name="Choose Year"
        label="Choose a year"
        placeholder="Choose a year"
        value={["2010", "2011", "2030"]}
        onSelect={(e) => setSortType(e.target.value)}></SelectInput>
    </div>
  );
}
Dashboard.Layout = PrimaryLayout;
