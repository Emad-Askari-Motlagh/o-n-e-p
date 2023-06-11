import React, { ChangeEvent, useEffect, useState } from "react";
import { NextApiRequest } from "next";
import { initializeApollo } from "@/lib/apollo/apollo-client";
import { FETCH_ALL_RESTAURANTS } from "server/graphql/querys/querys.graphql";
import dbInit from "lib/dbInit";
import {
  RestaurantsQuery,
  RestaurantsQueryVariables,
} from "@/server/generated/graphql";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";
import PrimaryLayout from "components/Primary-layout";
import Search from "components/Search-form";
import Restaurants from "screens/Home.Screen";
import { AiOutlineFork } from "react-icons/ai";

interface HomeProps {
  ALL_RESTAURANTS: IRestaurant[];
}

export default function Home({ ALL_RESTAURANTS }: HomeProps) {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const filteredRestaurants = ALL_RESTAURANTS.filter((res) => {
      return res.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setRestaurants(filteredRestaurants);
  }, [searchQuery, ALL_RESTAURANTS]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Search label="Hitta din restaurang" onChange={handleSearchChange}>
        <AiOutlineFork color="white" />
      </Search>

      <Restaurants
        ALL_RESTAURANTS={searchQuery ? restaurants : ALL_RESTAURANTS}
      />
    </>
  );
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    await dbInit(); // Init mongoDb

    const apolloClient = await initializeApollo({}); // Init Apollo client

    const res = await apolloClient.query<
      RestaurantsQuery,
      RestaurantsQueryVariables
    >({
      query: FETCH_ALL_RESTAURANTS,
    });

    return {
      props: {
        ALL_RESTAURANTS: res.data?.Restaurants || [],
        adminIsOnline: !!req.cookies?.token,
        costumerIsOnline: !!req.cookies?.costumerId,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        ALL_RESTAURANTS: [],
        adminIsOnline: false,
        costumerIsOnline: false,
      },
    };
  }
}

Home.Layout = PrimaryLayout;
