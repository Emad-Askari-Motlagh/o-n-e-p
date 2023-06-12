import {
  ADD_EXTRA_ORDER,
  DELETE_ADMIN_ORDER,
} from "./../server/graphql/querys/mutations.graphql";

import {
  OrdersQueryHookResult,
  AdminOrdersQueryVariables,
  AdminOrdersQueryResult,
  OrdersQuery,
  AdminOrdersQuery,
  AddExtraItemMutation,
  AddExtraItemMutationVariables,
  AddOrderMutation,
  AddOrderMutationVariables,
  RemoveOrderMutation,
  RemoveOrderMutationVariables,
  AddOrderMutationFn,
  RemoveOrderMutationFn,
} from "server/generated/graphql";
import { useEffect, useState } from "react";
import {
  ADD_ORDER,
  REMOVE_ORDER,
  GET_COSTUMER_ORDERS,
} from "@/server/graphql/querys/mutations.graphql";
import {
  GET_ADMIN_ORDERS,
  GET_ORDERS_CONSTANTLY,
} from "server/graphql/querys/querys.graphql";
import { MutationFunctionOptions, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

type MyTypes = {
  orders: OrdersQueryHookResult;
  loading: boolean;
  AdminOrders: AdminOrdersQueryResult;
  getAdminOrders_loading: boolean;
  addOrder?: AddOrderMutationFn;
  removeOrder?: RemoveOrderMutationFn;
};

const useOrders = () => {
  const router = useRouter();

  const restaurant = (router.query as { name: string }).name;
  const {
    data,
    error: adminOrdersError,
    loading: getAdminOrders_loading,
  } = useQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(GET_ADMIN_ORDERS, {
    pollInterval: 5000,
    onError: (err) => err.graphQLErrors.map((e) => console.log(e.extensions)),
  });
  const refetchTask = [
    { query: GET_ADMIN_ORDERS },
    "AdminOrders",
    { query: GET_ORDERS_CONSTANTLY },
    "Orders",
  ];
  const [
    addOrder,
    { data: orderData, loading: orderDataLoading, error: orderDataError },
  ] = useMutation<AddOrderMutation, AddOrderMutationVariables>(ADD_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: refetchTask,
  });
  const [addExtra, { loading: addExtraLoading, error: addExtraError }] =
    useMutation<AddExtraItemMutation, AddExtraItemMutationVariables>(
      ADD_EXTRA_ORDER,
      {
        refetchQueries: refetchTask,
      }
    );

  const [removeOrder] = useMutation<
    RemoveOrderMutation,
    RemoveOrderMutationVariables
  >(REMOVE_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: refetchTask,
  });

  const { data: fetchedOrders, loading } = useQuery<
    OrdersQuery,
    OrdersQueryVariables
  >(GET_ORDERS_CONSTANTLY, {
    variables: { restaurant },
  });
  const [DeleteItemFromAdminList] = useMutation(DELETE_ADMIN_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: refetchTask,
  });
  return {
    orders: fetchedOrders?.Orders,
    loading,
    AdminOrders: data?.AdminOrders,
    getAdminOrders_loading,
    addOrder,
    removeOrder,
    orderDataLoading,
    orderDataError,
    addExtra,
    addExtraLoading,
    addExtraError,
    adminOrdersError,
    DeleteItemFromAdminList,
  };
};

export default useOrders;
