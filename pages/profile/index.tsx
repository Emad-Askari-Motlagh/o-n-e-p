import InfoItem from "@/components/InfoItem";
import PrimaryLayout from "@/components/Primary-layout";
import SucceedMessage from "@/components/Succeed-Message";
import {
  EDIT_RESTAURANT_INFO_ITEM,
  EDIT_USER_INFO_ITEM,
} from "@/server/graphql/querys/mutations.graphql";
import { useMutation } from "@apollo/client";
import { useProvideAuth } from "hooks/Context.hook";
import React, { useState } from "react";
import styles from "./style.module.scss";

export default function Profile() {
  const { user } = useProvideAuth();
  const userInfo = user.data?.CurrentUser;
  const [changeUserInfo, { data: userEditData }] =
    useMutation(EDIT_USER_INFO_ITEM);
  const [changeRestaurantInfo, { data: restaurantEditData }] = useMutation(
    EDIT_RESTAURANT_INFO_ITEM
  );

  return (
    <div className={styles.container}>
      <InfoParent type="user" header="User information">
        <InfoItem
          label="Name"
          value={userInfo?.name as string}
          changeItem={changeUserInfo}
          type="user">
          {" "}
        </InfoItem>

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
        />
        <InfoItem
          label="Open times"
          type="restaurant"
          value={userInfo?.restaurant.openTimes as string}
        />
        <InfoItem
          label="Address"
          type="restaurant"
          value={userInfo?.restaurant.address as string}
        />
        <InfoItem
          type="restaurant"
          label="Food types"
          value={"userInfo?.name"}
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
