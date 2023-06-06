import { useApollo } from "@/lib/apollo/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ADD_ORDER } from "server/graphql/querys/mutations.graphql";

const useRestaurant = () => {
  const client = useApollo({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setRestaurant = async () => {
    const result = await client?.mutate({
      mutation: ADD_ORDER,
    });
    return result;
  };

  return {
    data,
    loading,
    error,
    setRestaurant,
  };
};

export default useRestaurant;
