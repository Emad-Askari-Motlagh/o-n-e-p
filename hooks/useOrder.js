import { useEffect, useState } from "react";
import {
  ADD_ORDER,
  REMOVE_ORDER,
  GET_COSTUMER_ORDERS,
} from "../server/graphql/querys/mutations";
import {
  GET_ADMIN_ORDERS,
  GET_ORDERS_CONSTANTLY,
  NEW_PERSON_FRAGMENT,
} from "@/server/graphql/querys/querys";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { useRouter } from "next/router";

const useOrders = () => {
  const [newUi, setNewUi] = useState([]);
  const router = useRouter();
  const restaurant = router.query.name;

  const {
    data,
    error,
    loading: getAdminOrders_loading,
    refetch,
  } = useQuery(GET_ADMIN_ORDERS, {
    onCompleted: () => {
      console.log("cc");
    },
  });
  const [addOrder, { data: orderData, loading: ooo }] = useMutation(ADD_ORDER, {
    refetchQueries: [
      { query: GET_ADMIN_ORDERS },
      "AdminOrders",
      { query: GET_ORDERS_CONSTANTLY },
      "orders",
    ],
    onCompleted: async () => {
      const rr = await (await refetch()).data?.AdminOrders;
      console.log(rr);
      setNewUi(rr);
    },
  });

  const [removeOrder] = useMutation(REMOVE_ORDER, {
    refetchQueries: [GET_ADMIN_ORDERS, GET_ORDERS_CONSTANTLY],
  });

  const { data: fetchedOrders, loading } = useQuery(GET_ORDERS_CONSTANTLY, {
    variables: { restaurant },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
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
