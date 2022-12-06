import InfoItem from "@/components/InfoItem";
import PrimaryLayout from "@/components/Primary-layout";
import SucceedMessage from "@/components/Succeed-Message";
import {
  EDIT_RESTAURANT_INFO_ITEM,
  EDIT_USER_INFO_ITEM,
} from "@/server/graphql/querys/mutations.graphql";
import { GET_CURRENT_USER } from "@/server/graphql/querys/querys.graphql";
import { gql, useMutation } from "@apollo/client";
import { useProvideAuth } from "hooks/Context.hook";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { CgProfile } from "react-icons/cg";

export default function Profile() {
  //   interface Emi{
  //     name<T>:string
  // };

  const { user } = useProvideAuth();
  const userInfo = user.data?.CurrentUser;
  const refetch = { refetchQueries: [{ query: GET_CURRENT_USER }] };
  const router = useRouter();
  const [changeUserInfo, { data: userEditData }] = useMutation(
    EDIT_USER_INFO_ITEM,
    refetch
  );
  const [changeRestaurantInfo, { data: restaurantEditData }] = useMutation(
    EDIT_RESTAURANT_INFO_ITEM,
    refetch
  );
  if (!user.data?.CurrentUser) {
    router.push("/auth/login");
  }
  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <span>
          <CgProfile className={styles.icon} />
        </span>
        <h1>Profile</h1>
      </div>
      <InfoParent type="user" header="User information">
        <InfoItem
          label="Name"
          value={userInfo?.name as string}
          changeItem={changeUserInfo}
          type="user"></InfoItem>

        <InfoItem
          label="Email"
          value={userInfo?.email as string}
          changeItem={changeUserInfo}
          type="user"
        />
      </InfoParent>
      <InfoParent type="restaurant" header="Restaurant information">
        <InfoItem
          label="Name"
          value={userInfo?.restaurant.name as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Open times"
          value={userInfo?.restaurant.openTimes as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Address"
          value={userInfo?.restaurant.address as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Food types"
          value={"userInfo?.name"}
          changeItem={changeRestaurantInfo}
        />
      </InfoParent>
    </div>
  );
}

const InfoParent = ({ header, children, type }) => {
  return (
    <div className={styles.restaurant_section}>
      <div className={styles.header_parent}>
        <h2>{header}</h2>
      </div>
      {children}
    </div>
  );
};

Profile.Layout = PrimaryLayout;
