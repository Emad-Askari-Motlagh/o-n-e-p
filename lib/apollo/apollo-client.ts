import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  split,
  NormalizedCacheObject,
  HttpLink,
  createHttpLink,
} from "@apollo/client";
import merge from "deepmerge";
import SSELink from "@/lib/sse";

const link = `${process.env.SERVER_LINK}`;
let apolloClient: any;
//create websocket link
// const wsLink =
//   typeof window !== "undefined"
//     ? new GraphQLWsLink(
//         createClient({
//           url: "ws://localhost:3000/api/graphql",
//         })
//       )
//     : null;

//create server sent events link
const sseLink = new SSELink({ uri: `${link}/api/graphql` });

//create http link
const httplink = new HttpLink({
  uri: `${link}/api/graphql`,
  credentials: "same-origin",
});

//Split the link based on graphql operation
// const HTTPLINK =
//   typeof window !== "undefined"
//     ? split(
//         ({ query }) => {
//           const definition = getMainDefinition(query);
//           return (
//             definition.kind === "OperationDefinition" &&
//             definition.operation === "subscription"
//           );
//         },
//         sseLink,
//         httplink
//       )
//     : httplink;

//create apollo client
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: httplink,
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(
  initialState: any
): ApolloClient<NormalizedCacheObject> {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }

  if (typeof window === "undefined") return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
