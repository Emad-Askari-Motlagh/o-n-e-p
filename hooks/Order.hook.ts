import {
  AddOrderMutationFn,
  AddOrderMutationHookResult,
  OrdersQueryHookResult,
  AddOrderMutationOptions,
  AddOrderMutation,
  AdminOrdersQueryResult,
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

interface MyTypes {
  orders: [] | OrdersQueryHookResult;
  loading: boolean;
  AdminOrders: AdminOrdersQueryResult | [];
  getAdminOrders_loading: boolean;
}

const useOrders = (): MyTypes => {
  const router = useRouter();
  const restaurant = router.query.name;
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

  const { data: fetchedOrders, loading } = useQuery(GET_ORDERS_CONSTANTLY, {
    variables: { restaurant },
  });

  return {
    orders: fetchedOrders?.Orders,
    loading,
    AdminOrders: data?.AdminOrders,
    getAdminOrders_loading,
    addOrder,
    removeOrder,
  };
};

export default useOrders;
