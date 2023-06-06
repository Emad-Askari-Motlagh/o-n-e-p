import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "components/Primary-layout";
import {
  GET_MENU_BY_SUB_CATEGORY,
  GET_MENU_ITEM_BY_CATREGORY,
} from "@/server/graphql/querys/querys.graphql";
import { useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import {
  MenuBySubCategoryQuery,
  MenuBySubCategoryQueryVariables,
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
} from "server/generated/graphql";
import MenuItems from "screens/MenuScreen/MenuItems";
import CategoryItems from "@/screens/MenuScreen/CategoryItems";

export default function Menu() {
  const Router = useRouter();
  const currentCat = Router.query.category?.[Router.query.category?.length - 1];
  const item = Router.query?.category?.[Router.query?.category.length - 1];
  const restaurant = Router.query?.name;

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
    data: menuItesmData,
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
  if (menuItemsLoading) return <div>...</div>;
  if (menuItemsError || !menuItesmData.MenuItemByCategory.length)
    return <ErrorCard>Couldn`t find any item</ErrorCard>;

  return (
    <div className={styles.container}>
      <motion.label
        className={styles.label}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}>
        {Router.query?.name}
      </motion.label>
      <div className={styles.items_parent}>
        {data?.MenuBySubCategory?.length ? (
          <CategoryItems items={data?.MenuBySubCategory} />
        ) : menuItesmData?.MenuItemByCategory.length ? (
          <MenuItems items={menuItesmData?.MenuItemByCategory} />
        ) : (
          !loading && <ErrorCard>Sorry</ErrorCard>
        )}
      </div>
    </div>
  );
}

Menu.Layout = PrimaryLayout;
