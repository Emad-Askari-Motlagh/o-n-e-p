import React, { useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "@/components/PrimaryLayout";
import {
  GET_MENU_BY_SUB_CATEGORY,
  GET_MENU_ITEM_BY_CATREGORY,
} from "@/server/graphql/querys/querys.graphql";
import {
  MenuBySubCategoryQuery,
  MenuBySubCategoryQueryVariables,
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
} from "server/generated/graphql";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { CgMenuHotdog } from "react-icons/cg";

// Dynamic import the MenuItems component
const MenuItems = dynamic(() => import("screens/MenuScreen/MenuItems"));

// Dynamic import the CategoryItems component
const CategoryItems = dynamic(
  () => import("@/screens/MenuScreen/CategoryItems")
);

export default function Menu() {
  const router = useRouter();
  const currentCat = router.query.category?.[router.query.category?.length - 1];
  const restaurant = router.query?.name;

  const { data, error, loading } = useQuery<
    MenuBySubCategoryQuery,
    MenuBySubCategoryQueryVariables
  >(GET_MENU_BY_SUB_CATEGORY, {
    variables: {
      restaurant: restaurant as string,
      subCategory: currentCat,
    },
  });
  const {
    data: menuItemsData,
    loading: menuItemsLoading,
    error: menuItemsError,
  } = useQuery<MenuItemByCategoryQuery, MenuItemByCategoryQueryVariables>(
    GET_MENU_ITEM_BY_CATREGORY,
    {
      variables: {
        category: currentCat as string,
        restaurant: restaurant as string,
      },
    }
  );

  if (menuItemsLoading) return <div>Loading...</div>;
  if (menuItemsError || !menuItemsData.MenuItemByCategory.length)
    return <ErrorCard>Couldn't find any item</ErrorCard>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Menu Page</title>
        <meta name="description" content="This is the menu page" />
      </Head>
      <AnimatedHeader Logo={<CgMenuHotdog />}>
        {router.query?.name} - Menu Items
      </AnimatedHeader>
      <div className={styles.items_parent}>
        {data?.MenuBySubCategory?.length ? (
          <CategoryItems items={data?.MenuBySubCategory} />
        ) : menuItemsData?.MenuItemByCategory.length ? (
          <MenuItems items={menuItemsData?.MenuItemByCategory} />
        ) : (
          !loading && <ErrorCard>Sorry</ErrorCard>
        )}
      </div>
    </div>
  );
}

Menu.Layout = PrimaryLayout;
