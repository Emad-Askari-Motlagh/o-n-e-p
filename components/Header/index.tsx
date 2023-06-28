import React, { ReactNode, FC } from "react";
import styles from "./header.module.scss";
import Navbar from "./Navbar";
import NavItem from "./NavItem";
import Logo from "components/Logo";
import {
  CgProfile,
  CgDetailsMore,
  CgLoadbar,
  CgUser,
  CgHome,
} from "react-icons/cg";
import Link from "next/link";
import captalizeFirstChar from "lib/captalizeFirstChar";
import { useUser } from "hooks/Context.hook";
import {
  CostumerQueryResult,
  CurrentUserQueryResult,
} from "@/server/generated/graphql";

interface HeaderProps {
  user: CurrentUserQueryResult;
  costumer: CostumerQueryResult;
  setIsVisible?: (visible: boolean) => void;
  isVisible?: boolean;
}

const Header: FC<HeaderProps> = (props) => {
  const { data: userData, error: userError, loading: userLoading } = props.user;
  const {
    data: costumerData,
    error: costumerError,
    loading: costumerLoading,
  } = props.costumer;

  const { user } = useUser();
  const homeEndPoint = user.data?.CurrentUser
    ? `/admin/${user.data.CurrentUser.restaurant.name}`
    : "/";

  return (
    <Navbar {...props}>
      <div
        onClick={() => props?.setIsVisible?.(!props?.isVisible)}
        className={styles.more_icon_container}>
        <CgDetailsMore
          className={styles.moreIconInHeader}
          color="white"
          size={40}
          onClick={() => props?.setIsVisible?.(false)}
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
              ? "red"
              : "tomato"
          }
        />

        {(costumerLoading || userLoading) && (
          <CgLoadbar color="white" className={styles.navBar_icons} />
        )}
        {(costumerError || userError) && (
          <CgLoadbar color="red" className={styles.navBar_icons} />
        )}
        {(costumerData || userData) && (
          <span className={styles.app_name}>
            {captalizeFirstChar(costumerData?.Costumer?.name) ||
              captalizeFirstChar(userData?.CurrentUser?.email)}
          </span>
        )}
      </div>

      <ul className={styles.items_cont}>
        <NavItem
          header_label=""
          icon={
            <Link href={homeEndPoint}>
              <div>
                <CgHome className={styles.icons} />
              </div>
            </Link>
          }
        />

        <NavItem
          header_label=""
          icon={
            <Link href={userData?.CurrentUser ? "/profile" : "/auth/login"}>
              <div>
                <CgProfile className={styles.icons} color="tomato" />
              </div>
            </Link>
          }
        />
      </ul>
    </Navbar>
  );
};

export default Header;
