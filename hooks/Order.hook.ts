import {
  ADD_EXTRA_ORDER,
  DELETE_ADMIN_ORDER,
  GET_BILL_INFO,
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
  PayedOrdersQuery,
  PayedOrdersQueryVariables,
  GetBillInfoMutation,
  GetBillInfoMutationVariables,
  OrdersQueryVariables,
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
  GET_PAYED_ORDERS,
} from "server/graphql/querys/querys.graphql";
import { useMutation, useQuery } from "@apollo/client";
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
  const payedOrders = useQuery<PayedOrdersQuery, PayedOrdersQueryVariables>(
    GET_PAYED_ORDERS,
    {
      variables: { restaurant: router.query?.name as string },
    }
  );

  const getBillInfo = useMutation<
    GetBillInfoMutation,
    GetBillInfoMutationVariables
  >(GET_BILL_INFO);
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
    addOrder,
    removeOrder,
    orderDataLoading,
    orderDataError,
    addExtra,
    addExtraLoading,
    addExtraError,
    DeleteItemFromAdminList,
    payedOrders,
    getBillInfo,
  };
};

export default useOrders;
