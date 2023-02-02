import { ADD_EXTRA_ORDER } from "./../server/graphql/querys/mutations.graphql";
import {
  AddExtraItemMutation,
  AddExtraItemMutationVariables,
  AddOrderMutation,
  AddOrderMutationVariables,
  RemoveOrderMutation,
  RemoveOrderMutationVariables,
} from "./../server/generated/graphql";
import {
  AddOrderMutationFn,
  AddOrderMutationHookResult,
  OrdersQueryHookResult,
  AddOrderMutationOptions,
  AddOrderMutation,
  OrdersQueryVariables,
  OrdersQueryResult,
  AdminOrdersQueryVariables,
  AdminOrdersQueryResult,
  OrdersQuery,
  AdminOrdersQuery,
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
  addOrder?: undefined;
  removeOrder?: undefined;
};

const useOrders = () => {
  const router = useRouter();

  const restaurant = (router.query as { name: string }).name;
  const {
    data,
    error,
    loading: getAdminOrders_loading,
  } = useQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(GET_ADMIN_ORDERS);
  const refetchTask = [
    { query: GET_ADMIN_ORDERS },
    "AdminOrders",
    { query: GET_ORDERS_CONSTANTLY },
    "Orders",
  ];
  const [addOrder, { data: orderData, loading: ooo }] = useMutation<
    AddOrderMutation,
    AddOrderMutationVariables
  >(ADD_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: refetchTask,
  });
  const [addExtra] = useMutation<
    AddExtraItemMutation,
    AddExtraItemMutationVariables
  >(ADD_EXTRA_ORDER, {
    refetchQueries: refetchTask,
    onError: (r) => {
      r.graphQLErrors.map((r) => {
        console.log(r.extensions);
      });
    },
  });

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
    onCompleted: (result) => {
      console.log(result);
    },
    onError: (err) => {
      err.graphQLErrors.map((res) => [console.log(res.extensions)]);
    },
  });

  return {
    orders: fetchedOrders?.Orders,
    loading,
    AdminOrders: data?.AdminOrders,
    getAdminOrders_loading,
    addOrder,
    removeOrder,
    addExtra,
  };
};

export default useOrders;
