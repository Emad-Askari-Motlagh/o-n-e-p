import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "components/Primary-layout";
import RestaurantSubItem from "components/RestaurantSubItem";
import { GET_MENU_CATREGORY } from "@/server/graphql/querys/querys.graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useId } from "react";
import styles from "./menu.module.scss";
import {
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "server/generated/graphql";
import Header_animations from "@/components/FramerHelper/Header_animations";
import Head from "next/head";

export default function Menu() {
  const Router = useRouter();
  const { data, error, loading } = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: { restaurant: Router.query?.name as string },
  });

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{Router.query?.name}</title>
        <meta name="description" content={`${Router.query?.name} menu`} />
      </Head>
      {error ? (
        <ErrorCard>Couldn`t find any item</ErrorCard>
      ) : (
        <>
          <Header_animations text="Menu"></Header_animations>
          <ul className={styles.items_parent}>
            {(data?.MenuByCategory
              ? data?.MenuByCategory
              : Array(data?.MenuByCategory?.length).fill(1)
            ).map((res, index) => {
              return (
                <li key={index} className={styles.item_parent}>
                  <RestaurantSubItem
                    key={index}
                    label={res.itemName}
                    endPoint={res.itemName}
                    image={res.image}
                  />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

Menu.Layout = PrimaryLayout;
