import { useApollo } from "@/lib/apollo/apollo-client";
import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { addRestaurant } from "@/server/graphql/querys/mutations";

const useRestaurant = (props) => {
  const client = useApollo({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setRestaurant = async () => {
    const result = await client?.mutate({
      mutation: AddRestaurant,
    });
    console.log(result);
    return result;
  };

  return {
    data,
    loading,
    error,
    products,
    setRestaurant,
  };
};

export default useRestaurant;
