import React, { useState, useEffect, useRef } from "react";
import styles from "./sidebar.module.scss";
import { BiBasket, BiBookAdd, BiCode } from "react-icons/bi";
import { IoIosArrowDropright, IoLogoBitcoin } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { RiContactsLine, RiDashboard2Fill, RiUser2Fill } from "react-icons/ri";
import { MdRestaurantMenu } from "react-icons/md";
import DropdownItem from "./SideBarItem";
import { useRouter } from "node_modules/next/router";
import { FaJediOrder } from "react-icons/fa";
import { GoSettings } from "react-icons/go";

interface SidebarProps {
  signOut: () => void;
  isCurrent?: boolean;
  restaurant?: string;
  isAdmin?: boolean;
  costumerData: any;
  user: { _id: number; restaurant: { name: string } };
}
function SideBar({
  signOut,
  isCurrent,
  restaurant,
  isAdmin,
  costumerData,
  user,
}: SidebarProps) {
  const Router = useRouter();
  async function SignOut() {
    await signOut();
    Router.reload();
  }

  const fetchedUser = user;
  const fetchedCostumer = costumerData?.Costumer;

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
            {restaurant || Router.query?.name
              ? restaurant || Router.query?.name
              : "Alliance Codes AB"}
          </span>
        </div>

        {user ? (
          <div>
            <DropdownItem
              leftIcon={<RiDashboard2Fill className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${user.restaurant.name}/dashboard`}
              itemsLabel="Dashboard"></DropdownItem>
            <DropdownItem
              leftIcon={<FaJediOrder className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?._id}/orders`}
              itemsLabel="Orders"></DropdownItem>
            <DropdownItem
              leftIcon={<MdRestaurantMenu className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}/menu`}
              itemsLabel="Menu"></DropdownItem>
            <DropdownItem
              leftIcon={<GoSettings className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}/setting`}
              itemsLabel="Setting"></DropdownItem>
          </div>
        ) : (
          fetchedCostumer &&
          Router.query.name && (
            <>
              <DropdownItem
                leftIcon={<BiBasket className={styles.nav_item_icons} />}
                rightIcon={null}
                endPoint={`/restaurant/${Router.query.name}/checkout/22`}
                itemsLabel="Orders"></DropdownItem>
              <DropdownItem
                leftIcon={<FaJediOrder className={styles.nav_item_icons} />}
                rightIcon={null}
                endPoint={`/restaurant/${Router.query.name}/orderHistory/${costumerData?.Costumer?._id}`}
                itemsLabel="Orders History"></DropdownItem>
            </>
          )
        )}

        {costumerData?.Costumer && (
          <DropdownItem
            leftIcon={<RiContactsLine className={styles.nav_item_icons} />}
            rightIcon={null}
            endPoint={`/restaurant/${Router.query.name}/reservation`}
            itemsLabel="Reservations"></DropdownItem>
        )}
        <DropdownItem
          leftIcon={<BiBookAdd className={styles.nav_item_icons} />}
          rightIcon={null}
          endPoint="/om"
          itemsLabel="Om"></DropdownItem>
        {(user || costumerData) && (
          <button className={styles.logout_button} onClick={SignOut}>
            {user ? "Logout" : costumerData && "Close the table"}
          </button>
        )}
      </div>
    </div>
  );
}

export default SideBar;
