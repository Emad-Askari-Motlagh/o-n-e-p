import React, { ChangeEvent, useState } from "react";
import Restaurants from "screens/Home.Screen";
import { initializeApollo } from "@/lib/apollo/apollo-client";
import PrimaryLayout from "components/Primary-layout";
import { FETCH_ALL_RESTAURANTS } from "server/graphql/querys/querys.graphql";
import dbInit from "lib/dbInit";
import Search from "components/Search-form";
import { AiOutlineFork } from "react-icons/ai";
import {
  RestaurantsQuery,
  RestaurantsQueryVariables,
} from "@/server/generated/graphql";
import { NextApiRequest } from "next";
import { IRestaurant } from "@/server/mongoSchema/restaurangSchema";

interface HomeProps {
  ALL_RESTAURANTS: [IRestaurant];
}
const Home = ({ ALL_RESTAURANTS }: HomeProps) => {
  const [restaurants, setRestaurants] = useState<[IRestaurant]>([]);
  const [searchQeury, setSearchQuery] = useState<string>();

  function searchOverRestaurants(e: ChangeEvent<HTMLInputElement>) {
    try {
      e.preventDefault();
      //Filter the restaurants when user begin to search
      const query = e.target.value || "";
      setSearchQuery(query);
      const result =
        Array.isArray(ALL_RESTAURANTS) &&
        ALL_RESTAURANTS.filter((res) => {
          if (res?.name.toLowerCase().includes(query)) {
            return res;
          }
        });
      setRestaurants(result);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Search label={"Hitta din restaurang"} onChange={searchOverRestaurants}>
        <AiOutlineFork color="white" />
      </Search>

      <Restaurants
        ALL_RESTAURANTS={searchQeury ? restaurants : ALL_RESTAURANTS}
      />
    </>
  );
};

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    //Init mongoDb
    await dbInit();
    // //Init Apollo client
    const apolloClient = await initializeApollo({});
    const res = await apolloClient.query<
      RestaurantsQuery,
      RestaurantsQueryVariables
    >({
      query: FETCH_ALL_RESTAURANTS,
    });
    //Get the cookie from the req
    return {
      props: {
        ALL_RESTAURANTS: res.data?.Restaurants,
        adminIsOnline: req.cookies?.["token"] ? true : false,
        costumerIsOnline: req.cookies?.["costumerId"] ? true : false,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {},
    };
  }
}
export default Home;
Home.Layout = PrimaryLayout;
