import React from "react";
import { NextApiRequest } from "next";
import { gql, useMutation } from "@apollo/client";
import { decodeJwt } from "@/lib/storeJwt";
import dbInit from "@/lib/dbInit";
import userSchema, { I_UserDocument } from "@/server/mongoSchema/userSchema";
import PrimaryLayout from "@/components/PrimaryLayout";
import InfoItem from "@/components/InfoItem";
import Restaurant from "@/components/RestaurantCard";
import { CgProfile } from "react-icons/cg";
import { GET_CURRENT_USER } from "@/server/graphql/querys/querys.graphql";
import {
  EDIT_RESTAURANT_INFO_ITEM,
  EDIT_USER_INFO_ITEM,
} from "@/server/graphql/querys/mutations.graphql";
import { useUser } from "hooks/Context.hook";
import styles from "./style.module.scss";
import AnimatedHeader from "@/components/AnimatedHeader";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";
import {
  EditRestaurantInfoItemMutation,
  EditRestaurantInfoItemMutationVariables,
  EditUserInfoItemMutation,
  EditUserInfoItemMutationVariables,
} from "@/server/generated/graphql";

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

const Profile: React.FC<ProfileProps> = ({ RES }: ProfileProps) => {
  const res: IRestaurant = JSON.parse(RES);
  const { user } = useUser();
  const userInfo = user.data?.CurrentUser as UserInfo;
  const refetch = { refetchQueries: [{ query: GET_CURRENT_USER }] };

  const [changeUserInfo, { data: userEditData }] = useMutation<
    EditUserInfoItemMutation,
    EditUserInfoItemMutationVariables
  >(EDIT_USER_INFO_ITEM, refetch);
  const [changeRestaurantInfo, { data: restaurantEditData }] = useMutation<
    EditRestaurantInfoItemMutation,
    EditRestaurantInfoItemMutationVariables
  >(EDIT_RESTAURANT_INFO_ITEM, refetch);

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
        index={1}
      />
      <InfoParent type="user" header="User information">
        <InfoItem
          label="Name"
          value={userInfo.name}
          changeItem={changeUserInfo}
          type="user"
          field="name"
        />
        <InfoItem
          label="Email"
          value={userInfo.email}
          changeItem={changeUserInfo}
          type="user"
          field="email"
        />
      </InfoParent>
      <InfoParent type="restaurant" header="Restaurant information">
        <InfoItem
          label="Name"
          value={userInfo.restaurant.name}
          changeItem={changeRestaurantInfo}
          field="name"
        />
        <InfoItem
          label="Open times"
          value={userInfo.restaurant.openTimes}
          changeItem={changeRestaurantInfo}
          field="openTimes"
        />
        <InfoItem
          label="Address"
          value={userInfo.restaurant.address}
          changeItem={changeRestaurantInfo}
          field="address"
        />
        <InfoItem
          label="Food types"
          value={"vegan"} // Should this be userInfo.restaurant.foodTypes?
          changeItem={changeRestaurantInfo}
          field="foodTypes"
        />
      </InfoParent>
    </div>
  );
};

interface InfoParentProps {
  header: string;
  children: React.ReactNode;
  type: string;
}

const InfoParent: React.FC<InfoParentProps> = ({
  header,
  children,
  type,
}: InfoParentProps) => {
  return (
    <div className={styles.restaurant_section}>
      <div className={styles.header_parent}>
        <h2>{header}</h2>
      </div>
      {children}
    </div>
  );
};

export default Profile;

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
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { RES: null },
    };
  }
}

Profile.Layout = PrimaryLayout;
