import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "@/components/PrimaryLayout";
import RestaurantParentCard from "@/components/RestaurantParentCard";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import styles from "./menu.module.scss";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { BiCategoryAlt } from "react-icons/bi";
import { useMenu } from "hooks/Menu.hook";

export default function Menu() {
  const Router = useRouter();
  const {
    MenuByCategory: { data, loading, error },
  } = useMenu();

  const menuItems = useMemo(() => {
    return data?.MenuByCategory ?? [];
  }, [data]);

  const menuItemsComponent = menuItems.map((res, index) => {
    return (
      <li key={index} className={styles.item_parent}>
        <RestaurantParentCard
          key={index}
          label={res.itemName}
          endPoint={res.itemName}
          image={res?.image}
        />
      </li>
    );
  });
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
            {menuItems?.length && menuItemsComponent}
          </ul>
        </>
      )}
    </div>
  );
}

Menu.Layout = PrimaryLayout;
