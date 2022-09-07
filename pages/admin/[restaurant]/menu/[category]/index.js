import React, { useEffect } from "react";
import PrimaryLayout from "components/Primary-layout";
import MenuEditor from "components/MenuEditor";
import {
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_CATREGORY,
} from "server/graphql/querys/querys.graphql";
import Inputs from "components/MenuEditor/Inputs";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_MENU_ITEMS } from "server/graphql/querys/mutations.graphql";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./styles.module.scss";
import Search from "components/Search-form";

export default function Category() {
  const { query } = useRouter();

  const [save] = useMutation(UPDATE_MENU_ITEMS);
  const { data, loading, error } = useQuery(GET_MENU_ITEM_BY_CATREGORY, {
    variables: { category: query.category, restaurant: query.restaurant },
  });

  return (
    <div className={styles.container}>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle className={styles.add_button} />
      </div>
      <Search placeHolder={"Filter"} label={"Hitta bord"} onChange={""} />
      <div className={styles.items_parent}>
        {Array.isArray(data?.MenuItemByCategory) &&
          data.MenuItemByCategory.map((res, i) => (
            <div key={i}>
              <MenuEditor
                restaurant={query.restaurant}
                category={query.category}
                submit={save}
                data={res}></MenuEditor>
            </div>
          ))}
      </div>
    </div>
  );
}
Category.Layout = PrimaryLayout;
