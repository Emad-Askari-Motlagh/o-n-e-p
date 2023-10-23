import React, { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { NextApiRequest } from "next";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/PrimaryLayout";
import RegisterForm from "components/CostumerRegistration";
import ErrorCard from "components/ErrorCard";
import SucceedMessage from "@/components/Succeed-Message";
import { ADD_COSTUMER } from "server/graphql/querys/mutations.graphql";
import dbInit from "lib/dbInit";
import Costumer from "server/mongoSchema/costumerSchema";
import { I_CostumerDocument } from "server/mongoSchema/costumerSchema";
import {
  AddCostumerMutation,
  AddCostumerMutationVariables,
} from "@/server/generated/graphql";
import AnimatedHeader from "@/components/AnimatedHeader";
import Link from "next/link";
import { CgSelect } from "react-icons/cg";

interface RestaurantProps {
  COSTUMER: I_CostumerDocument | null;
}
interface AlternativesItemProps {
  label: string;
  variant: "eatHere" | "takeAway";
  endPoint: string;
}
const Restaurant: React.FC<RestaurantProps> = ({ COSTUMER }) => {
  const [error, setError] = useState<string | null>(null);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [addCostumer] = useMutation<
    AddCostumerMutation,
    AddCostumerMutationVariables
  >(ADD_COSTUMER, {
    onCompleted: () => {
      setIsRegistered(true);
      setError(null);
      setTimeout(() => {
        Router.reload();
      }, 1000);
    },
  });
  const Router = useRouter();

  const submitForm = async (values: {
    email: string;
    table: number;
    name: string;
  }) => {
    try {
      const { email, table, name } = values;
      await addCostumer({
        variables: {
          email,
          table,
          name,
        },
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <AnimatedHeader Logo={<CgSelect />}>
        {!COSTUMER
          ? "Costumer Registration"
          : "Please choose one of the alternatives!"}
      </AnimatedHeader>

      {!COSTUMER ? (
        // If COSTUMER is not available, render the registration form
        <>
          <RegisterForm onSubmit={submitForm} />
          {error && <ErrorCard>{error}</ErrorCard>}
          {isRegistered && <SucceedMessage>Costumer Registered</SucceedMessage>}
        </>
      ) : (
        // If COSTUMER is available, render the alternatives
        <div className={styles.alternatives}>
          <AlternativesItem
            endPoint={`${Router.asPath}/menu`}
            label="EAT HERE"
            variant="eatHere"
          />
          <AlternativesItem
            endPoint={`${Router.asPath}/menu`}
            label="TAKE AWAY"
            variant="takeAway"
          />
        </div>
      )}
    </div>
  );
};

const AlternativesItem: React.FC<AlternativesItemProps> = ({
  label,
  variant,
  endPoint,
}) => (
  <Link href={endPoint}>
    <div
      className={
        variant === "eatHere"
          ? styles.alternatives__eat_here
          : styles.alternatives__take_away
      }>
      <span className={styles.image_label}>{label}</span>
    </div>
  </Link>
);
export default Restaurant;
Restaurant.Layout = PrimaryLayout;

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    await dbInit(); // Initialize MongoDB

    let costumer = null;

    // Get the cookie from the request
    const { costumerId } = req.cookies;

    // If there is a cookie, find the costumer in the database
    if (costumerId) {
      costumer = await Costumer.findById(costumerId);
    }

    return {
      props: {
        COSTUMER: JSON.parse(JSON.stringify(costumer)) ?? null,
      },
    };
  } catch (err) {
    return {
      props: {
        COSTUMER: null,
      },
    };
  }
}
