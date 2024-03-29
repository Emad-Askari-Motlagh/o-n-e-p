import React from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import ErrorCard from "components/ErrorCard";
import PrimaryLayout from "@/components/PrimaryLayout";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { CgMenuHotdog } from "react-icons/cg";
import { useMenu } from "hooks/Menu.hook";
import SimpleLoading from "@/components/SimpleLoading";
import { MenuItemByCategoryQuery } from "@/server/generated/graphql";

// Dynamic import the MenuItems component
const MenuItems = dynamic(() => import("screens/MenuScreen/MenuItems"), {
  loading: () => <SimpleLoading />,
});

// Dynamic import the CategoryItems component
const CategoryItems = dynamic(
  () => import("@/screens/MenuScreen/CategoryItems"),
  {
    loading: () => <SimpleLoading />,
  }
);

export default function Menu() {
  const router = useRouter();

  const {
    menuBySubCategory: { data, error, loading },
    menuItemByCategory: {
      data: menuItemsData,
      loading: menuItemsLoading,
      error: menuItemsError,
    },
  } = useMenu();

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
        {data?.MenuBySubCategory?.length > 0 ? (
          <CategoryItems items={data?.MenuBySubCategory} />
        ) : menuItemsData?.MenuItemByCategory.length > 0 ? (
          <MenuItems
            items={menuItemsData?.MenuItemByCategory as MenuItemByCategoryQuery}
          />
        ) : (
          !loading && <ErrorCard>Sorry! couldnt find any item</ErrorCard>
        )}
      </div>
    </div>
  );
}

Menu.Layout = PrimaryLayout;
