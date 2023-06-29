import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "@/components/PrimaryLayout";
import RestaurantParentCard from "@/components/RestaurantParentCard";
import { GET_MENU_CATREGORY } from "@/server/graphql/querys/querys.graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styles from "./menu.module.scss";
import {
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "server/generated/graphql";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { BiCategoryAlt } from "react-icons/bi";

export default function Menu() {
  const Router = useRouter();
  const { data, error, loading } = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: { restaurant: Router.query?.name as string },
  });

  const menuItems = useMemo(() => {
    return data?.MenuByCategory ?? [];
  }, [data]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{Router.query?.name}</title>
        <meta name="description" content={`${Router.query?.name} menu`} />
      </Head>
      {error && !loading ? (
        <ErrorCard>Couldn't find any item</ErrorCard>
      ) : (
        <>
          <AnimatedHeader Logo={<BiCategoryAlt />}>
            Menu Categories
          </AnimatedHeader>
          <ul className={styles.items_parent}>
            {menuItems?.length &&
              menuItems.map((res, index) => {
                return (
                  <li key={index} className={styles.item_parent}>
                    <RestaurantParentCard
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
