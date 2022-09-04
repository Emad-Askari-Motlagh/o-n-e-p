import React, { useState, useEffect, useRef } from "react";
import styles from "./sidebar.module.scss";
import { BiBookAdd, BiCode } from "react-icons/bi";
import { IoIosArrowDropright, IoLogoBitcoin } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { RiContactsLine, RiDashboard2Fill, RiUser2Fill } from "react-icons/ri";

import DropdownItem from "./SideBarItem";
import { useRouter } from "node_modules/next/router";

function SideBar({
  signOut,
  isCurrent,
  restaurant,
  isAdmin,
  costumerData,
  user,
}) {
  const Router = useRouter();
  async function SignOutByCostumer() {
    await signOut();
    Router.reload();
  }
  const fetchedUser = user?.data?.getCurrentUser;
  const fetchedCostumer = costumerData.data?.getCostumer;
  return (
    <div className={styles.dropdown}>
      <div className={styles.items_wrapper}>
        <div className={styles.user_container}>
          {Router.query?.name ? (
            <IoLogoBitcoin size={24} className={styles.user_icon} />
          ) : (
            <BiCode size={24} className={styles.user_icon} />
          )}
          <span className={styles.restaurant_name}>
            {restaurant ? restaurant : "Alliance Codes AB"}
          </span>
        </div>

        <DropdownItem
          isCurrent={isCurrent}
          leftIcon={<RiDashboard2Fill className={styles.nav_item_icons} />}
          rightIcon={null}
          endPoint="/auth/login"
          itemsLabel="Dashboard"></DropdownItem>
        {isAdmin ? (
          <DropdownItem
            leftIcon={<FcAbout className={styles.nav_item_icons} />}
            rightIcon={null}
            endPoint={`/admin/${fetchedUser?._id}/orders`}
            itemsLabel="Orders"></DropdownItem>
        ) : (
          fetchedCostumer &&
          Router.query.name && (
            <DropdownItem
              leftIcon={<FcAbout className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/restaurant/${Router.query.name}/checkout/22`}
              itemsLabel="Orders"></DropdownItem>
          )
        )}

        <DropdownItem
          leftIcon={<BiBookAdd className={styles.nav_item_icons} />}
          rightIcon={null}
          endPoint="/om"
          itemsLabel="Om"></DropdownItem>
        {costumerData.data?.getCostumer && Router.query?.name && (
          <DropdownItem
            leftIcon={<RiContactsLine className={styles.nav_item_icons} />}
            rightIcon={null}
            endPoint={`/restaurant/${Router.query.name}/reservation`}
            itemsLabel="Reservations"></DropdownItem>
        )}

        {
          <button className={styles.logout_button} onClick={SignOutByCostumer}>
            {isAdmin
              ? "Logout"
              : costumerData.data?.getCostumer && "Close the table"}
          </button>
        }
      </div>
    </div>
  );
}

export default SideBar;