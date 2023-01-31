import { ADD_MENU_ITEM_SUB_CATEGORY } from "./../server/graphql/querys/mutations.graphql";
import {
  AddMenuItemSubCategoryMutation,
  AddMenuItemSubCategoryMutationVariables,
  DeleteMenuItemSubCategoryMutation,
  DeleteMenuItemSubCategoryMutationVariables,
  FetchAllMenuItemsQuery,
  FetchAllMenuItemsQueryVariables,
} from "./../server/generated/graphql";
import { GET_ALL_MENU_ITEMS } from "./../server/graphql/querys/querys.graphql";
import React, { useState } from "react";

import {
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_BY_SUB_CATEGORY,
} from "server/graphql/querys/querys.graphql";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_MENU_CATEGORY,
  ADD_MENU_ITEM,
  UPDATE_CATEGORY,
  UPDATE_MENU_ITEMS,
  DELETE_CATEGORY,
  ADD_MENU_SUB_CATEGORY,
  DELETE_MENU_ITEM_SUB_CATEGORY,
} from "server/graphql/querys/mutations.graphql";

import {
  AddMenuCategoryMutation,
  AddMenuCategoryMutationVariables,
  AddMenuItemMutation,
  AddMenuItemMutationVariables,
  DeleteMenuCategoryMutation,
  DeleteMenuCategoryMutationVariables,
  MenuBySubCategoryQuery,
  MenuBySubCategoryQueryVariables,
  MenuItemByCategoryQuery,
  MenuItemByCategoryQueryVariables,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  UpdateMenuItemsMutation,
  UpdateMenuItemsMutationVariables,
} from "@/server/generated/graphql";

export default function useMenu() {
  const { query, push, reload } = useRouter();
  const [documentSaved, setDocumentSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSaved, setIsItemSaved] = useState(false);

  const currentCat = query?.category?.[query?.category?.length - 1];
  const { data: allItems } = useQuery<
    FetchAllMenuItemsQuery,
    FetchAllMenuItemsQueryVariables
  >(GET_ALL_MENU_ITEMS, {
    variables: { restaurant: "Göteburgare" },
  });
  const [updateCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: () => {
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsItemSaved(false);
        reload();
      }, 1500);
    },
  });

  const [addSubCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(ADD_MENU_SUB_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
  });

  const { data, error, loading } = useQuery<
    MenuBySubCategoryQuery,
    MenuBySubCategoryQueryVariables
  >(GET_MENU_BY_SUB_CATEGORY, {
    variables: {
      restaurant: query.restaurant as string,
      subCategory: currentCat,
    },
  });

  const [addMenuItem, { error: errorOnSavingItem }] = useMutation<
    AddMenuItemMutation,
    AddMenuItemMutationVariables
  >(ADD_MENU_ITEM, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: () => {
      setIsItemSaved(true);
      reload();
    },
  });

  const [AddSubCatToMenuItem] = useMutation<
    AddMenuItemSubCategoryMutation,
    AddMenuItemSubCategoryMutationVariables
  >(ADD_MENU_ITEM_SUB_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: (res) => {
      console.log(res);
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        reload();
      }, 1500);
    },
    onError: (err) => {
      err.graphQLErrors.map((re) => {
        console.log(re.extensions);
      });
    },
  });
  const [deleteSubCatToMenuItem] = useMutation<
    DeleteMenuItemSubCategoryMutation,
    DeleteMenuItemSubCategoryMutationVariables
  >(DELETE_MENU_ITEM_SUB_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: (res) => {
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        reload();
      }, 1500);
    },
    onError: (err) => {
      err.graphQLErrors.map((re) => {
        console.log(re.extensions);
      });
    },
  });
  const [addCategory, { data: addCategoryData }] = useMutation<
    AddMenuCategoryMutation,
    AddMenuCategoryMutationVariables
  >(ADD_MENU_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql

      "MenuBySubCategory", // Query name
    ],
    onCompleted: () => {
      setIsItemSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
        reload();
      }, 1500);
    },
    onError: (err) => {
      err.graphQLErrors.map((re) => {
        console.log(re.extensions);
      });
    },
  });
  const [saveMenuItem] = useMutation<
    UpdateMenuItemsMutation,
    UpdateMenuItemsMutationVariables
  >(UPDATE_MENU_ITEMS, {
    refetchQueries: [
      { query: GET_MENU_ITEM_BY_CATREGORY }, // DocumentNode object parsed with gql
      "MenuItemByCategory", // Query name
    ],

    onCompleted: (r) => {
      setDocumentSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
    },
  });
  const [deleteCategory] = useMutation<
    DeleteMenuCategoryMutation,
    DeleteMenuCategoryMutationVariables
  >(DELETE_CATEGORY, {
    refetchQueries: [
      { query: GET_MENU_BY_SUB_CATEGORY }, // DocumentNode object parsed with gql
      "MenuBySubCategory", // Query name
    ],

    onCompleted: (r) => {
      setDocumentSaved(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 2000);
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
        restaurant: query.restaurant as string,
      },
    }
  );

  return {
    menuItesmData,
    menuItemsLoading,
    menuItemsError,
    deleteCategory,
    saveMenuItem,
    addCategory,
    addMenuItem,
    addSubCategory,
    updateCategory,
    isModalOpen,
    itemSaved,
    documentSaved,
    menuBySubCategoryData: data,
    menuBySubCategoryError: error,
    menuBySubCategoryLoading: loading,
    setIsModalOpen,
    addCategoryData,
    errorOnSavingItem,
    allItems,
    AddSubCatToMenuItem,
    deleteSubCatToMenuItem,
  };
}
