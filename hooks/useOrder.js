import { useEffect, useState } from "react";
import {
  ADD_ORDER,
  REMOVE_ORDER,
  GET_COSTUMER_ORDERS,
} from "@/server/graphql/querys/mutations";
import {
  GET_ADMIN_ORDERS,
  GET_ORDERS_CONSTANTLY,
  NEW_PERSON_FRAGMENT,
} from "@/server/graphql/querys/querys";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const useOrders = () => {
  const [newUi, setNewUi] = useState([]);
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
      "orders",
    ],
  });

  const [removeOrder] = useMutation(REMOVE_ORDER, {
    fetchPolicy: "network-only",
    refetchQueries: [
      { query: GET_ADMIN_ORDERS },
      "AdminOrders",
      { query: GET_ORDERS_CONSTANTLY },
      "orders",
    ],
  });

  const { data: fetchedOrders, loading } = useQuery(GET_ORDERS_CONSTANTLY, {
    variables: { restaurant },
  });

  return {
    orders: fetchedOrders?.orders ?? [],
    addOrder,
    removeOrder,
    loading,
    AdminOrders: data?.AdminOrders,
    newUi: newUi,
    getAdminOrders_loading,
    orderData,
  };
};

export default useOrders;
