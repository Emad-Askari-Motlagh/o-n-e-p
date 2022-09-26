import { ApolloProvider } from "@apollo/client";
import { useProvideAuth } from "hooks/Context.hook";
import React, { createContext, ReactNode } from "react";

const authContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      <ApolloProvider client={auth.client}>{children}</ApolloProvider>
    </authContext.Provider>
  );
}
