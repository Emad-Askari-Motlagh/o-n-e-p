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
import Header_animations from "@/components/framer_helpers/Header_animations";

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
                    image={"/2.webp"}
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
