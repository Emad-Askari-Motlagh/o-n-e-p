import "../styles/globals.scss";
import type { ReactElement, ReactNode } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Router from "next/router";
import styles from "../styles/share.module.scss";
import Head from "next/head";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@/lib/apollo/apollo-client";

import groovyWalkAnimation from "../public/spinner2.json";
import dynamic from "next/dynamic";

const LoadingIndicatorComponent = dynamic(
  () => import("components/LoadingIndicator")
);
const Noop = ({ children }: { children: ReactNode }) => <>{children}</>;
type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  Layout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const LoadingIndicator = () => (
  <div className={styles.spinner}>
    <LoadingIndicatorComponent animation={groovyWalkAnimation} />
  </div>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [loading, setLoading] = useState(false);
  const client = useApollo({});
  const Layout = Component.Layout || Noop;

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };

    const end = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bestellät - Restaurants-List</title>
      </Head>
      <ApolloProvider client={client}>
        <Layout>
          {loading ? <LoadingIndicator /> : <Component {...pageProps} />}
        </Layout>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
