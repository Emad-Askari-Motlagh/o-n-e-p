import Head from "next/head";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "src/components/Header/header";
import Footer from "src/components/Footer";
import styles from "./Layout.module.scss";
import React from "react";

function PrimaryLayout(props) {
  return (
    <div>
      <div className={styles.main}>
        <Head>
          <title>Shopia</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        {props.children}
        <Footer />
      </div>
    </div>
  );
}
export default PrimaryLayout;
