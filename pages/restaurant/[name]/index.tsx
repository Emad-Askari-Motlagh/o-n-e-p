import React, { useEffect, useState, Suspense, startTransition } from "react";
import styles from "./styles.module.scss";
import PrimaryLayout from "components/Primary-layout";
import RegisterForm from "components/CostumerRegistration";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_COSTUMER } from "server/graphql/querys/mutations.graphql";
import dbInit from "lib/dbInit";
import Costumer from "server/mongoSchema/costumerSchema";
import RestaurantSubItem from "components/RestaurantSubItem";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import ErrorCard from "components/ErrorCard";
import SucceedMessage from "@/components/Succeed-Message";

export default function Restaurant({ COSTUMER }) {
  const [error, setError] = useState<string | null>("");
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [AddCostumer] = useMutation(ADD_COSTUMER, {
    onError: (err) => {
      setError("Sorry there is a problem, contact the personal");
    },
    onCompleted: () => {
      setIsRegistered(true);
    },
  });

  const Router = useRouter();

  async function submitForm(values) {
    try {
      const { email, table, name } = values;
      await AddCostumer({
        variables: {
          name,
          email,
          table,
        },
      });

      Router.reload();
    } catch (err: any) {
      console.log(err.message);
    }
  }

  return (
    <div className={styles.container}>
      <motion.label
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}>
        {!COSTUMER
          ? "Costumer Registration"
          : "Please choose one of alternatives!"}
      </motion.label>
      {!COSTUMER ? (
        <>
          <RegisterForm onSubmit={submitForm} />
          {error && <ErrorCard>{error}</ErrorCard>}
          {isRegistered && <SucceedMessage value="Done"></SucceedMessage>}
        </>
      ) : (
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
}

Restaurant.Layout = PrimaryLayout;

export async function getServerSideProps({ req }) {
  try {
    //Init mongoDb
    await dbInit();

    let costumer = null;
    //Get the cookie from the req
    const { costumerId } = req.cookies;
    //If there was a cookie then find the costumer in DB and return it
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