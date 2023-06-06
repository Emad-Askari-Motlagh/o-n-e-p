import InfoItem from "@/components/InfoItem";
import PrimaryLayout from "@/components/Primary-layout";
import SucceedMessage from "@/components/Succeed-Message";
import {
  EDIT_RESTAURANT_INFO_ITEM,
  EDIT_USER_INFO_ITEM,
} from "@/server/graphql/querys/mutations.graphql";
import { GET_CURRENT_USER } from "@/server/graphql/querys/querys.graphql";
import { gql, useMutation } from "@apollo/client";
import { useUser } from "hooks/Context.hook";
import React, { useEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { CgProfile } from "react-icons/cg";
import RestaurantSubItem from "@/components/RestaurantSubItem";
import Restaurant from "@/components/Restaurant";
import dbInit from "@/lib/dbInit";
import { NextApiRequest } from "next";
import { decodeJwt } from "@/lib/storeJwt";
import userSchema, { I_UserDocument } from "@/server/mongoSchema/userSchema";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";

interface ProfileProps {
  RES: string;
}

interface UserInfo {
  name: string;
  email: string;
  restaurant: {
    name: string;
    openTimes: string;
    address: string;
  };
}

export default function Profile({ RES }: ProfileProps) {
  const res = JSON.parse(RES) as Restaurant;
  const { user } = useUser();
  const userInfo = user.data?.CurrentUser as UserInfo;
  const refetch = { refetchQueries: [{ query: GET_CURRENT_USER }] };

  const [changeUserInfo, { data: userEditData }] = useMutation(
    EDIT_USER_INFO_ITEM,
    refetch
  );
  const [changeRestaurantInfo, { data: restaurantEditData }] = useMutation(
    EDIT_RESTAURANT_INFO_ITEM,
    refetch
  );

  if (!user.data?.CurrentUser) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <span>
          <CgProfile className={styles.icon} />
        </span>
        <h1>Profile</h1>
      </div>
      <Restaurant
        location={res.location}
        key={res._id}
        name={res.name ?? "placeHolder"}
        description={res.description ?? "placeHolder"}
        images={res.images}
        endPoint={`/admin/${res.name}/menu`}
        buttonLabel="Edit the menu"
      />
      <InfoParent type="user" header="User information">
        <InfoItem
          label="Name"
          value={userInfo.name}
          changeItem={changeUserInfo}
          type="user"
        />

        <InfoItem
          label="Email"
          value={userInfo.email}
          changeItem={changeUserInfo}
          type="user"
        />
      </InfoParent>
      <InfoParent type="restaurant" header="Restaurant information">
        <InfoItem
          label="Name"
          value={userInfo.restaurant.name}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Open times"
          value={userInfo.restaurant.openTimes}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Address"
          value={userInfo.restaurant.address}
          changeItem={changeRestaurantInfo}
        />
        <InfoItem
          label="Food types"
          value={userInfo.name} // Should this be userInfo.restaurant.foodTypes?
          changeItem={changeRestaurantInfo}
        />
      </InfoParent>
    </div>
  );
}

interface InfoParentProps {
  header: string;
  children: React.ReactNode;
  type: string;
}

const InfoParent = ({ header, children, type }: InfoParentProps) => {
  return (
    <div className={styles.restaurant_section}>
      <div className={styles.header_parent}>
        <h2>{header}</h2>
      </div>
      {children}
    </div>
  );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    // Init mongoDb
    const token = req.cookies["token"];
    if (!token) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    await dbInit();
    const user: { id: string } = decodeJwt(token as string);
    const userObj: I_UserDocument = await userSchema
      .findById(user?.id)
      .populate("restaurant");

    return {
      props: {
        RES: JSON.stringify(userObj.restaurant),
        adminIsOnline: !!req.cookies?.["token"],
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}

Profile.Layout = PrimaryLayout;
