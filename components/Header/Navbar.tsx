import React, { ReactNode, FC } from "react";
import styles from "./header.module.scss";

interface NavbarProps {
  children: ReactNode;
}

const Navbar: FC<NavbarProps> = ({ children }) => {
  return <nav className={styles.navbar}>{children}</nav>;
};

export default Navbar;
