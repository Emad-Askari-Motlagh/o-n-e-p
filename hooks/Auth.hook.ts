import { useRouter } from "next/router";
import React, { useState, useContext, createContext, useCallback } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useApollo } from "lib/apollo/apollo-client";
import {
  GET_COSTUMER,
  GET_CURRENT_USER,
} from "server/graphql/querys/querys.graphql";
import {
  LOGIN,
  SIGN_OUT,
  CREATE_USER,
  SIGN_OUT_COSTUMER,
  ADD_COSTUMER,
} from "server/graphql/querys/mutations.graphql";
import {
  AddCostumerMutation,
  AddCostumerMutationVariables,
} from "@/server/generated/graphql";

type UserInput = { email: string; password: string; username?: string };
function useAuth() {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const Router = useRouter();
  const client = useApollo({});
  const [signInError, setSignInError] = useState<string | undefined>();
  const costumerData = useQuery(GET_COSTUMER);
  const userData = useQuery(GET_CURRENT_USER);

  const isSignedIn = useCallback(() => !!authToken, [authToken]);

  const getAuthHeaders = useCallback(() => {
    return authToken ? { authorization: `Bearer ${authToken}` } : null;
  }, [authToken]);

  const [signOutCostumer] = useMutation(SIGN_OUT_COSTUMER);

  const addCostumerMutation = useMutation<
    AddCostumerMutation,
    AddCostumerMutationVariables
  >(ADD_COSTUMER);

  const signIn = useCallback(
    async ({ email, password }: UserInput) => {
      try {
        const result = await client.mutate({
          mutation: LOGIN,
          variables: { email, password },
          refetchQueries: [{ query: GET_CURRENT_USER }],
        });
        const token = result.data?.SignIn.token;
        if (token) {
          setAuthToken(token);
          return token;
        } else {
          return null;
        }
      } catch (err) {
        setSignInError("An unexpected error occurred");
        console.log("Error during the signin", err);
      }
    },
    [client]
  );

  const signUp = useCallback(
    async ({ email, password, username }: UserInput) => {
      try {
        const result = await client.mutate({
          mutation: CREATE_USER,
          variables: { email, password, username },
        });
        Router.push("/auth/login");
        return result.data?.CreateUser;
      } catch (err) {
        console.log(err?.message ?? err);
      }
    },
    [client, Router]
  );

  const signOut = useCallback(async () => {
    try {
      await client.mutate({
        mutation: SIGN_OUT,
      });
    } catch (err) {
      console.log(err?.message ?? err);
    }
  }, [client]);

  return {
    isSignedIn,
    signIn,
    signOut,
    signOutCostumer,
    client,
    user: userData,
    signUp,
    token: authToken,
    costumerData,
    signInError,
    addCostumerMutation,
  };
}

export default useAuth;
