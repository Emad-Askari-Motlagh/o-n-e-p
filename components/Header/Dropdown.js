import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.scss";
import { FiSettings } from "react-icons/fi";
import { BiBookAdd } from "react-icons/bi";
import router, { useRouter } from "next/router";
import { IoIosArrowDropright } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { RiContactsLine, RiDashboard2Fill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { useProvideAuth } from "@/hooks/Context.hook";
import WebsiteName from "./WebsiteName";

export default function DropdownMenu({ isVisible, setIsVisible, elementRef }) {
  const { signOut } = useProvideAuth();
  return (
    <div
      className={styles.dropdown}
      style={{
        width: isVisible ? "350px" : "0px",
        borderWidth: isVisible ? "2px" : "0",
      }}
      ref={isVisible ? elementRef : null}
    >
      <IoIosArrowDropright
        className={styles.upArrow}
        size={32}
        onClick={() => {
          setIsVisible(false);
        }}
      />

      <WebsiteName />
      <DropDownItem
        leftIcon={<RiDashboard2Fill color="white" />}
        rightIcon={null}
        endPoint="/om"
      >
        <a rel="noopener" href={"/Dashboard"} className={styles.menu_item}>
          Dashboard
        </a>
      </DropDownItem>
      <DropDownItem
        leftIcon={<FcAbout color="white" />}
        rightIcon={null}
        endPoint="/om"
      >
        <a rel="noopener" href={"/om"} className={styles.menu_item}>
          Om oss
        </a>
      </DropDownItem>
      <DropDownItem leftIcon={<BiBookAdd color="white" />} rightIcon={null}>
        <button
          rel="noopener"
          style={{ borderWidth: 0, backgroundColor: "transparent" }}
          className={styles.menu_item}
          onClick={signOut}
        >
          Orders
        </button>
      </DropDownItem>

      <DropDownItem
        leftIcon={<RiContactsLine color="white" />}
        rightIcon={null}
      >
        <a rel="noopener" href={"/kontakt"} className={styles.menu_item}>
          Skriva till oss
        </a>
      </DropDownItem>
      <DropDownItem leftIcon={<MdLogout color="white" />} rightIcon={null}>
        <button
          rel="noopener"
          style={{ borderWidth: 0, backgroundColor: "transparent" }}
          className={styles.menu_item}
          onClick={signOut}
        >
          Logout
        </button>
      </DropDownItem>
    </div>
  );
}

function DropDownItem(props) {
  return (
    <div className={styles.menu_item}>
      <span className={styles.icon_button}>{props.leftIcon}</span>
      {props.children}
      <div className={styles.icon_right}> {props.rightIcon}</div>
    </div>
  );
}
