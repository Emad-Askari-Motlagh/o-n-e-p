import {
  CreateUserMutation,
  CreateUserMutationVariables,
  SignInMutation,
  SignInMutationVariables,
  SignInWithGoogleMutation,
  SignInWithGoogleMutationVariables,
  SignOutMutation,
  SignOutMutationVariables,
  CurrentUserQuery,
  CurrentUserQueryVariables,
  CostumerQuery,
  CostumerQueryVariables,
  SignOutCostumerMutation,
  SignOutCostumerMutationVariables,
} from "server/generated/graphql";
import React, {
  useState,
  useContext,
  createContext,
  useEffect,
  Context,
  ReactNode,
  useCallback,
} from "react";
import { ApolloProvider, useMutation, useQuery } from "@apollo/client";
import { initializeApollo, useApollo } from "lib/apollo/apollo-client";
import {
  GET_COSTUMER,
  GET_CURRENT_USER,
} from "server/graphql/querys/querys.graphql";
import {
  LOGIN,
  SIGN_OUT,
  CREATE_USER,
  LOGIN_WITH_GOOGLE,
  SIGN_OUT_COSTUMER,
} from "server/graphql/querys/mutations.graphql";
import { useRouter } from "next/router";

const authContext = createContext({});

export const useAuth = () => {
  return useContext(authContext);
};
interface User {
  email: string;
  _id: string;
  name: string;
  restaurant: string;
}
export function useProvideAuth() {
  const [authToken, setAuthToken] = useState<string | undefined>();
  const [user, setUser] = useState<CurrentUserQuery>();
  const authHdaders = getAuthHeaders();
  const Router = useRouter();
  const client = useApollo({});
  const [signInError, setSignInError] = useState<string | undefined>();
  const costumerData = useQuery<CostumerQuery, CostumerQueryVariables>(
    GET_COSTUMER
  );

  //Try to use hooks
  const [signOutCostumer] = useMutation<
    SignOutCostumerMutation,
    SignOutCostumerMutationVariables
  >(SIGN_OUT_COSTUMER);
  const userData = useQuery<CurrentUserQuery>(GET_CURRENT_USER);

  const isSignedIn = () => {
    if (authToken) {
      return true;
    } else {
      return false;
    }
  };

  function getAuthHeaders() {
    if (!authToken) return null;
    return {
      authorization: `Bearer ${authToken}`,
    };
  }

  //Use mutate functions
  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const result = await client.mutate<
        SignInMutation,
        SignInMutationVariables
      >({
        mutation: LOGIN,
        variables: { email, password },
        refetchQueries: [{ query: GET_CURRENT_USER }, "CurrentUser"],
      });
      const token = result.data?.SignIn.token;

      if (token) {
        setAuthToken(token);
        return token;
      } else {
        return null;
      }
    } catch (err) {
      console.log("Error during the signin", err);
    }
  };

  const SigninWithGoogle = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await client.mutate<
      SignInWithGoogleMutation,
      SignInWithGoogleMutationVariables
    >({
      mutation: LOGIN_WITH_GOOGLE,
      variables: { email, password },
    });
    setAuthToken(result.data?.SignInWithGoogle.token);
    if (!result.errors && result.data) {
      return result.data.SignInWithGoogle.token;
    } else {
      setSignInError("Error on signin happend");
    }
  };

  const signUp = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      const result = await client.mutate<
        CreateUserMutation,
        CreateUserMutationVariables
      >({
        mutation: CREATE_USER,
        variables: { email, password, username },
      });

      Router.push("/auth/login");
      return result.data?.CreateUser;
    } catch (err: any) {
      console.log(err?.message ?? err);
    }
  };

  const signOut = async () => {
    try {
      await client.mutate<SignOutMutation, SignOutMutationVariables>({
        mutation: SIGN_OUT,
      });
      Router.reload();
    } catch (err: any) {
      console.log(err?.message ?? err);
    }
  };

  return {
    isSignedIn,
    signIn,
    signOut,
    signOutCostumer,
    client,
    user: userData,
    signUp,
    SigninWithGoogle,
    token: authToken,
    costumerData,
  };
}
