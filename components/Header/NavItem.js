import React, { useEffect, useState } from "react";
import styles from "./header.module.scss";

export default function NavItem(props) {
  return (
    <li
      className={styles.nav_item}
      onClick={props.onClick}
      onPointerLeave={props.onPointerLeave}
    >
      {props.children}
      {props.icon}
      <span>{props.header_label}</span>
    </li>
  );
}
