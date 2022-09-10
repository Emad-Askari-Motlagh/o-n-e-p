import React, { useState, useContext, createContext, useEffect } from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import { initializeApollo, useApollo } from "lib/apollo/apollo-client";
import { GET_CURRENT_USER } from "@/server/graphql/querys/querys.graphql";
import {
  LOGIN,
  SIGN_OUT,
  CREATE_USER,
  LOGIN_WITH_GOOGLE,
} from "@/server/graphql/querys/mutations.graphql";
import { useRouter } from "next/router";

const authContext = createContext();

export function AuthProvider({ children }, props) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.client}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};

export function useProvideAuth(props) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState();
  const authHdaders = getAuthHeaders();
  const Router = useRouter();
  const client = useApollo();
  const [signInError, setSignInError] = useState();

  const getCurrentUser = async () => {
    try {
      const result = await client.query({
        query: GET_CURRENT_USER,
      });

      if (result.data) {
        setUser(result.data.CurrentUser);
      }
    } catch (err) {
      setSignInError(err);
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

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

  const signIn = async ({ email, password }) => {
    try {
      const result = await client.mutate({
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

  const SigninWithGoogle = async ({ email, password }) => {
    const result = await client.mutate({
      mutation: LOGIN_WITH_GOOGLE,
      variables: { email, password },
    });
    setAuthToken(result.data.SignIn.token);
    if (!result.errors) {
      return result.data.SignIn.token;
    } else {
      setSignInError("Error on signin happend");
    }
  };

  const signUp = async ({ email, password, username }) => {
    try {
      const result = await client.mutate({
        mutation: CREATE_USER,
        variables: { email, password, username },
      });

      setAuthToken(result.data.SignIn);

      Router.push("/");
      return result.data.CreateUser;
    } catch (err) {
      console.log(err?.message ?? err);
    }
  };

  const signOut = async () => {
    try {
      await client.mutate({
        mutation: SIGN_OUT,
      });
      Router.reload();
    } catch (err) {
      console.log(err?.message ?? err);
    }
  };

  return {
    isSignedIn,
    signIn,
    signOut,
    client,
    user,
    signUp,
    getCurrentUser,
    SigninWithGoogle,
    token: authToken,
  };
}
