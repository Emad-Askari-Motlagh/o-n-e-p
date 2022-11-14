import React, { useEffect, useState } from "react";
import PrimaryLayout from "components/Primary-layout";
import MenuEditor from "components/MenuEditor";
import MenuAdder from "@/components/MenuAdder";
import {
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_CATREGORY,
} from "server/graphql/querys/querys.graphql";
import Inputs from "@/components/MenuEditor/MenuItem";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_MENU_ITEM,
  UPDATE_MENU_ITEMS,
} from "server/graphql/querys/mutations.graphql";
import { IoMdAddCircle } from "react-icons/io";
import styles from "./styles.module.scss";
import Search from "components/Search-form";
import {
  AddMenuItemMutation,
  AddMenuItemMutationVariables,
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
  UpdateMenuItemsMutation,
  UpdateMenuItemsMutationVariables,
} from "@/server/generated/graphql";
import Modall from "@/components/Modal";
import SucceedMessage from "@/components/Succeed-Message";
import ErrorCard from "@/components/ErrorCard";

export default function Category() {
  const { query } = useRouter();
  const [documentSaved, setDocumentSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSaved, setIsItemSaved] = useState(false);
  const router = useRouter();

  const [addMenuItem, { error: errorOnSavingItem }] = useMutation<
    AddMenuItemMutation,
    AddMenuItemMutationVariables
  >(ADD_MENU_ITEM, {
    refetchQueries: [
      { query: GET_MENU_ITEM_BY_CATREGORY }, // DocumentNode object parsed with gql

      "MenuItemByCategory", // Query name
    ],
    onCompleted: (err) => {
      setIsItemSaved(true);
    },
  });
  const [save] = useMutation<
    UpdateMenuItemsMutation,
    UpdateMenuItemsMutationVariables
  >(UPDATE_MENU_ITEMS, {
    refetchQueries: [
      { query: GET_MENU_ITEM_BY_CATREGORY }, // DocumentNode object parsed with gql
      "MenuItemByCategory", // Query name
    ],

    onCompleted: () => {
      setDocumentSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    },
  });
  const { data, loading, error } = useQuery<
    MenuItemByCategoryQuery,
    MenuItemByCategoryQueryVariables
  >(GET_MENU_ITEM_BY_CATREGORY, {
    variables: {
      category: query.category as string,
      restaurant: query.restaurant as string,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.add_button_parent}>
        <IoMdAddCircle
          className={styles.add_button}
          onClick={() => setIsModalOpen(true)}
        />
        <Modall
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          label="Create new item">
          <MenuAdder
            submit={addMenuItem}
            restaurant={router.query.restaurant as string}
            category={router.query.category as string}></MenuAdder>
          {itemSaved && <SucceedMessage>ItemSaved</SucceedMessage>}
          {errorOnSavingItem && (
            <ErrorCard>There was an error during creation</ErrorCard>
          )}
        </Modall>
      </div>
      <Search
        placeHolder={"Filter"}
        label={"Hitta bord"}
        onChange={() => null}
      />
      <div className={styles.items_parent}>
        {Array.isArray(data?.MenuItemByCategory) &&
          data?.MenuItemByCategory.map((res, i) => (
            <div key={i}>
              <MenuEditor
                restaurant={query.restaurant}
                category={query.category}
                submit={save}
                data={res}
                isSaved={documentSaved}></MenuEditor>
            </div>
          ))}
      </div>
    </div>
  );
}
Category.Layout = PrimaryLayout;
