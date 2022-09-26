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
} from "./../server/generated/graphql";
import { useEffect, useState } from "react";
import {
  ADD_ORDER,
  REMOVE_ORDER,
  GET_COSTUMER_ORDERS,
} from "@/server/graphql/querys/mutations.graphql";
import {
  GET_ADMIN_ORDERS,
  GET_ORDERS_CONSTANTLY,
} from "@/server/graphql/querys/querys.graphql";
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
  } = useQuery(GET_ADMIN_ORDERS);
  const [addOrder, { data: orderData, loading: ooo }] = useMutation(ADD_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: GET_ADMIN_ORDERS },
      "AdminOrders",
      { query: GET_ORDERS_CONSTANTLY },
      "Orders",
    ],
  });

  const [removeOrder] = useMutation(REMOVE_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: GET_ADMIN_ORDERS },
      "AdminOrders",
      { query: GET_ORDERS_CONSTANTLY },
      "Orders",
    ],
  });

  const { data: fetchedOrders, loading } = useQuery<
    OrdersQuery,
    OrdersQueryVariables
  >(GET_ORDERS_CONSTANTLY, {
    variables: { restaurant },
  });

  return {
    orders: fetchedOrders,
    loading,
    AdminOrders: data,
    getAdminOrders_loading,
    addOrder,
    removeOrder,
  };
};

export default useOrders;
