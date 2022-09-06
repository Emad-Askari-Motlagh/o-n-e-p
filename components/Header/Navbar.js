import React, { useContext, useEffect } from "react";
import styles from "./header.module.scss";
import router from "next/router";
import {
  CgDetailsMore,
  CgLoadbar,
  CgUser,
  CgShoppingCart,
  CgHome,
} from "react-icons/cg";
import { trimUserName } from "utils/stringHelpers";

function Navbar({ children }) {
  return <nav className={styles.navbar}>{children}</nav>;
}

function Show_create_account_label({ navbar, user, userLoading }) {
  async function clicky() {
    // const app = new Realm.App({ id: "shopia-uosya" })
    // // Redirect Uri : <AppDomain>/redirect
    // const RedirectUri = "https://rent-app-emad.herokuapp.com/auth/login"
    // const credentials = Realm.Credentials.google(RedirectUri)
    // const user = await app.logIn(credentials)
  }
  var format = /[-@_.]/;

  return (
    <div className={styles.user} onClick={clicky}>
      <CgUser className={styles.user_icons} />
      <span className={styles.showuser}>{trimUserName(user)}</span>
    </div>
  );
}

export default Navbar;
