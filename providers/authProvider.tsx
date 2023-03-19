import { useApollo } from "@/lib/apollo/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { useUser } from "hooks/Context.hook";
import React, { createContext, ReactNode } from "react";

const authContext = createContext({});

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useUser();
  return <authContext.Provider value={auth}>{children} </authContext.Provider>;
}
