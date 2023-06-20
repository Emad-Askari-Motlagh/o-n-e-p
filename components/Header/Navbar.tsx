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

export default Navbar;
