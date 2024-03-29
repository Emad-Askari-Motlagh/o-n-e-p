import React from "react";
import styles from "./sidebar.module.scss";
import { BiBasket, BiBookAdd, BiCode } from "react-icons/bi";
import {
  RiContactsLine,
  RiDashboard2Fill,
  RiReservedFill,
} from "react-icons/ri";
import { MdRestaurantMenu } from "react-icons/md";
import DropdownItem from "./SideBarItem";
import { useRouter } from "next/router";
import { FaJediOrder } from "react-icons/fa";
import Button2 from "@/components/ButtonSecoundary";
import { CostumerQuery } from "@/server/generated/graphql";
import { IoFastFoodOutline, IoSettings } from "react-icons/io5";

interface SidebarProps {
  signOut: () => void;
  isCurrent?: boolean;
  restaurant?: string;
  isAdmin?: boolean;
  costumerData: CostumerQuery;
  user: {
    _id: string;
    restaurant?: { name: string };
    email: string;
    name: string;
  };
}
function SideBar({ signOut, restaurant, costumerData, user }: SidebarProps) {
  const Router = useRouter();
  async function SignOut() {
    await signOut();
    window.location.href = "/";
  }

  const fetchedUser = user;
  const fetchedCostumer = costumerData?.Costumer;

  return (
    <div className={styles.dropdown}>
      <div className={styles.items_wrapper}>
        <div className={styles.user_container}>
          {Router.query?.name || Router.query?.restaurant ? (
            <IoFastFoodOutline size={24} className={styles.user_icon} />
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
              endPoint={`/admin/${fetchedUser.restaurant.name}/dashboard`}
              itemsLabel="Dashboard"></DropdownItem>
            <DropdownItem
              leftIcon={<FaJediOrder className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}/orders`}
              itemsLabel="Orders"></DropdownItem>
            <DropdownItem
              leftIcon={<MdRestaurantMenu className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}/menu`}
              itemsLabel="Menu"></DropdownItem>
            <DropdownItem
              leftIcon={<RiReservedFill className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}/reservations`}
              itemsLabel="Reservations"></DropdownItem>
            <DropdownItem
              leftIcon={<IoSettings className={styles.nav_item_icons} />}
              rightIcon={null}
              endPoint={`/admin/${fetchedUser?.restaurant.name}`}
              itemsLabel="Setting"></DropdownItem>
          </div>
        ) : (
          fetchedCostumer &&
          Router.query.name && (
            <>
              <DropdownItem
                leftIcon={<BiBasket className={styles.nav_item_icons} />}
                rightIcon={null}
                endPoint={`/${Router.query.name}/checkout`}
                itemsLabel="Orders"></DropdownItem>
              <DropdownItem
                leftIcon={<FaJediOrder className={styles.nav_item_icons} />}
                rightIcon={null}
                endPoint={`/${Router.query.name}/orderHistory/${costumerData?.Costumer?._id}`}
                itemsLabel="Orders History"></DropdownItem>
              <DropdownItem
                leftIcon={<RiContactsLine className={styles.nav_item_icons} />}
                rightIcon={null}
                endPoint={`/${Router.query.name}/reservation`}
                itemsLabel="Reservations"></DropdownItem>
            </>
          )
        )}

        <DropdownItem
          leftIcon={<BiBookAdd className={styles.nav_item_icons} />}
          rightIcon={null}
          endPoint="/about"
          itemsLabel="About"></DropdownItem>
        {(user || costumerData?.Costumer) && (
          <Button2 width="50%" type="button" onClick={SignOut}>
            {user ? "Logout" : costumerData && "Close the table"}
          </Button2>
        )}
      </div>
    </div>
  );
}

export default SideBar;
