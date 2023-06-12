import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useMutation } from "@apollo/client";
import { NextApiRequest } from "next";
import styles from "./styles.module.scss";
import PrimaryLayout from "components/Primary-layout";
import RegisterForm from "components/CostumerRegistration";
import RestaurantSubItem from "components/RestaurantSubItem";
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

interface RestaurantProps {
  COSTUMER: I_CostumerDocument | null;
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
      <motion.h1
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}>
        {!COSTUMER
          ? "Costumer Registration"
          : "Please choose one of the alternatives!"}
      </motion.h1>

      {!COSTUMER ? (
        // If COSTUMER is not available, render the registration form
        <>
          <RegisterForm onSubmit={submitForm} />
          {error && <ErrorCard>{error}</ErrorCard>}
          {isRegistered && <SucceedMessage>Costumer Registered</SucceedMessage>}
        </>
      ) : (
        // If COSTUMER is available, render the alternatives
        <div className={styles.items_parent}>
          <div className={styles.item_parent}>
            <RestaurantSubItem
              label={"EAT HERE"}
              endPoint={"Menu"}
              image={"/3.webp"}
              key={1}
            />
          </div>
          <div className={styles.item_parent}>
            <RestaurantSubItem
              label={"TAKE AWAY"}
              endPoint={"Menu"}
              image={"/1.webp"}
              key={2}
            />
          </div>
        </div>
      )}
    </div>
  );
};
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
