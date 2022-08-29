import { ApolloProvider, useQuery } from "@apollo/client";
import { useApollo } from "@/lib/apollo/apollo-client";

function MyApp({ Component, pageProps }) {
  const client = useApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
