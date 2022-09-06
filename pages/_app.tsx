import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Router from "next/router";
import Lottie from "react-lottie-player";
import styles from "../styles/share.module.scss";
import lottieJson from "../public/spinner2.json";
import { AuthProvider } from "hooks/Context.hook";
import Head from "next/head";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);

  const Layout = Component.Layout || Noop;

  React.useEffect(() => {
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
    //if  loading is false then we render whole app but before that spinner spining
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading ? (
        <AuthProvider>
          <Layout>
            <div className={styles.container}>
              <div className={styles.spinner}>
                <h3 className={styles.loading_h5}>Loading...</h3>
                <Lottie
                  loop
                  animationData={lottieJson}
                  play
                  style={{ width: 200, height: 200, margin: "auto" }}
                />
              </div>
            </div>
          </Layout>
        </AuthProvider>
      ) : (
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      )}
    </>
  );
}

export default MyApp;
