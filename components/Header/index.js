import React, { useRef, useState, useEffect } from "react";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import { useRouter } from "next/router";
import Logo from "components/Logo";
import { CgProfile } from "react-icons/cg";
import {
  CgDetailsMore,
  CgLoadbar,
  CgUser,
  CgShoppingCart,
  CgHome,
} from "react-icons/cg";
import Link from "next/link";

export default function Header(props) {
  const { data: userData, error: userError, loading: userLoading } = props.user;
  const { data: costumerData, costumerError, costumerLoading } = props.costumer;

  return (
    <Navbar {...props}>
      <div
        onClick={() => props?.setIsVisible(!props?.isVisible)}
        className={styles.more_icon_container}>
        <CgDetailsMore
          className={styles.moreIconInHeader}
          color="white"
          size={40}
          onClick={() => props?.setIsVisible(false)}
        />
      </div>

      <div className={styles.websites_name_caption}>
        <div className={styles.restaurant_logo}>
          <Logo />
        </div>

        <label className={styles.app_logo_name}>Beställät</label>
      </div>
      <div className={styles.websites_name_caption}>
        <CgUser
          className={styles.user_logo}
          color={
            typeof userData === "undefined" ||
            typeof costumerData === "undefined"
              ? "white"
              : "red"
          }></CgUser>

        {(costumerLoading || userLoading) && (
          <CgLoadbar color="white" className={styles.navBar_icons} />
        )}
        {(costumerError || userError) && (
          <CgLoadbar color="red" className={styles.navBar_icons} />
        )}
        {(costumerData || userData) && (
          <span className={styles.app_name}>
            {costumerData?.getCostumer?.name || userData?.getCurrentUser?.email}
          </span>
        )}
      </div>

      <ul className={styles.items_cont}>
        <NavItem
          header_label=""
          icon={
            <Link href="/restaurant">
              <div>
                <CgHome className={styles.icons} />
              </div>
            </Link>
          }
        />
        <NavItem
          header_label=""
          icon={<CgShoppingCart className={styles.icons} />}
        />

        <NavItem
          header_label=""
          icon={
            <Link href="/auth/login">
              <div>
                {" "}
                <CgProfile className={styles.icons} color="tomato" />
              </div>
            </Link>
          }
        />
      </ul>
    </Navbar>
  );
}
