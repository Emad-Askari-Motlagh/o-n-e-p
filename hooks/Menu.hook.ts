import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useCallback, useEffect } from "react";

import {
  ADD_MENU_ITEM_SUB_CATEGORY,
  ADD_MENU_CATEGORY,
  ADD_MENU_ITEM,
  UPDATE_CATEGORY,
  UPDATE_MENU_ITEMS,
  DELETE_CATEGORY,
  ADD_MENU_SUB_CATEGORY,
  DELETE_MENU_ITEM_SUB_CATEGORY,
} from "server/graphql/querys/mutations.graphql";

import {
  GET_ALL_MENU_ITEMS,
  GET_MENU_ITEM_BY_CATREGORY,
  GET_MENU_BY_SUB_CATEGORY,
  GET_MENU_CATREGORY,
} from "server/graphql/querys/querys.graphql";

import {
  AddMenuItemSubCategoryMutation,
  AddMenuItemSubCategoryMutationVariables,
  DeleteMenuItemSubCategoryMutation,
  DeleteMenuItemSubCategoryMutationVariables,
  FetchAllMenuItemsQuery,
  FetchAllMenuItemsQueryVariables,
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
  MenuByCategoryQuery,
  MenuByCategoryQueryVariables,
} from "@/server/generated/graphql";
import { GraphQLError } from "graphql";

export function useMenu() {
  const { query, reload } = useRouter();
  const [documentSaved, setDocumentSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemSaved, setIsItemSaved] = useState(false);

  const currentCat = query?.category?.[query?.category?.length - 1];

  const handleCompleted = useCallback(() => {
    setIsItemSaved(true);
    setTimeout(() => {
      setIsModalOpen(false);
      reload();
    }, 1000);
  }, [setIsItemSaved, setIsModalOpen, reload]);

  const handleOnError = useCallback((err: any) => {
    err.extensions.forEach((error: GraphQLError) => {
      console.error(error.extensions);
    });
  }, []);
  const menuItemByCategory = useQuery<
    MenuItemByCategoryQuery,
    MenuItemByCategoryQueryVariables
  >(GET_MENU_ITEM_BY_CATREGORY, {
    variables: {
      category: currentCat as string,
      restaurant: (query?.name as string) || (query?.name as string),
    },
  });
  const menuBySubCategory = useQuery<
    MenuBySubCategoryQuery,
    MenuBySubCategoryQueryVariables
  >(GET_MENU_BY_SUB_CATEGORY, {
    variables: {
      restaurant: (query?.name as string) || (query?.restaurant as string),
      subCategory: currentCat,
    },
    onCompleted: (d) => {
      console.log(d);
    },
    onError: (err) => err.graphQLErrors.map((r) => console.log(r.extensions)),
  });

  const MenuByCategory = useQuery<
    MenuByCategoryQuery,
    MenuByCategoryQueryVariables
  >(GET_MENU_CATREGORY, {
    variables: {
      restaurant: (query?.name as string) || (query?.restaurant as string),
    },
  });
  const { data: allItems } = useQuery<
    FetchAllMenuItemsQuery,
    FetchAllMenuItemsQueryVariables
  >(GET_ALL_MENU_ITEMS, {
    variables: {
      restaurant: (query?.name as string) || (query?.restaurant as string),
    },
  });

  const [updateCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(UPDATE_CATEGORY, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
  });

  const [addSubCategory] = useMutation<
    UpdateCategoryMutation,
    UpdateCategoryMutationVariables
  >(ADD_MENU_SUB_CATEGORY, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
  });

  const [addMenuItem, { error: errorOnSavingItem }] = useMutation<
    AddMenuItemMutation,
    AddMenuItemMutationVariables
  >(ADD_MENU_ITEM, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
  });

  const [AddSubCatToMenuItem] = useMutation<
    AddMenuItemSubCategoryMutation,
    AddMenuItemSubCategoryMutationVariables
  >(ADD_MENU_ITEM_SUB_CATEGORY, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
  });

  const [deleteSubCatToMenuItem] = useMutation<
    DeleteMenuItemSubCategoryMutation,
    DeleteMenuItemSubCategoryMutationVariables
  >(DELETE_MENU_ITEM_SUB_CATEGORY, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
  });

  const [addCategory, { data: addCategoryData }] = useMutation<
    AddMenuCategoryMutation,
    AddMenuCategoryMutationVariables
  >(ADD_MENU_CATEGORY, {
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
    onError: handleOnError,
  });

  const [saveMenuItem] = useMutation<
    UpdateMenuItemsMutation,
    UpdateMenuItemsMutationVariables
  >(UPDATE_MENU_ITEMS, {
    refetchQueries: [{ query: GET_MENU_ITEM_BY_CATREGORY }],
    onCompleted: handleCompleted,
  });

  const [deleteCategory] = useMutation<
    DeleteMenuCategoryMutation,
    DeleteMenuCategoryMutationVariables
  >(DELETE_CATEGORY, {
    onError: handleOnError,
    refetchQueries: [{ query: GET_MENU_BY_SUB_CATEGORY }],
    onCompleted: handleCompleted,
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
        restaurant: query.restaurant as string,
      },
    }
  );

  return {
    menuItemsData,
    menuItemsLoading,
    menuItemsError,
    deleteCategory,
    saveMenuItem,
    addCategory,
    addMenuItem,
    menuItemByCategory,
    addSubCategory,
    updateCategory,
    isModalOpen,
    itemSaved,
    documentSaved,
    setIsModalOpen,
    addCategoryData,
    errorOnSavingItem,
    allItems,
    AddSubCatToMenuItem,
    deleteSubCatToMenuItem,
    MenuByCategory,
    menuBySubCategory,
  };
}
