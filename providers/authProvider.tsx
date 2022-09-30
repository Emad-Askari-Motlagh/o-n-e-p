import { useApollo } from "@/lib/apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { useProvideAuth } from "hooks/Context.hook";
import React, { createContext, ReactNode } from "react";

const authContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children} </authContext.Provider>;
}
