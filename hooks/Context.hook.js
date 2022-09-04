import React, { useState, useContext, createContext, useEffect } from "react";
import { ApolloProvider, useQuery } from "@apollo/client";
import { initializeApollo, useApollo } from "lib/apollo/apollo-client";
import router, { useRouter } from "next/router";
import { GET_CURRENT_USER } from "server/graphql/querys/querys";
import { SIGN_OUT } from "server/graphql/querys/mutations";
import {
  LoginMutation,
  CreateUser,
  LoginWithGoogle,
} from "@/server/graphql/querys/mutations";

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
  const [signInErro, setSignInError] = useState();

  const getCurrentUser = async () => {
    try {
      const result = await client.query({
        query: GET_CURRENT_USER,
      });

      if (result.data) {
        setUser(result.data.getCurrentUser);
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
        mutation: LoginMutation,
        variables: { email, password },
        refetchQueries: [{ query: GET_CURRENT_USER }, "getCurrentUser"],
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
      mutation: LoginWithGoogle,
      variables: { email, password },
    });
    setAuthToken(result.data.SignIn.token);

    return result.data.SignIn.token;
  };

  const signUp = async ({ email, password, username }) => {
    try {
      const result = await client.mutate({
        mutation: CreateUser,
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
