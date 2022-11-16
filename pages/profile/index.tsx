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
import React, { useState } from "react";
import styles from "./style.module.scss";

export default function Profile() {
  const { user } = useProvideAuth();
  const userInfo = user.data?.CurrentUser;
  const refetch = { refetchQueries: [{ query: GET_CURRENT_USER }] };

  const [changeUserInfo, { data: userEditData }] = useMutation(
    EDIT_USER_INFO_ITEM,
    refetch
  );
  const [changeRestaurantInfo, { data: restaurantEditData }] = useMutation(
    EDIT_RESTAURANT_INFO_ITEM,
    refetch
  );

  return (
    <div className={styles.container}>
      <h1>Profile</h1>
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
          type="restaurant"
          label="Name"
          value={userInfo?.restaurant.name as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Open times"
          type="restaurant"
          value={userInfo?.restaurant.openTimes as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Address"
          type="restaurant"
          value={userInfo?.restaurant.address as string}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          type="restaurant"
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
