import React, { ChangeEvent, useEffect, useState, useMemo } from "react";
import { NextApiRequest } from "next";
import { initializeApollo } from "@/lib/apollo/apollo-client";
import { FETCH_ALL_RESTAURANTS } from "server/graphql/querys/querys.graphql";
import dbInit from "lib/dbInit";
import {
  RestaurantsQuery,
  RestaurantsQueryVariables,
} from "@/server/generated/graphql";
import { IRestaurant } from "@/server/mongoSchema/restaurantSchema";
import PrimaryLayout from "@/components/PrimaryLayout";
import Search from "@/components/SearchForm";
import { AiOutlineFork } from "react-icons/ai";
import ErrorCard from "@/components/ErrorCard";
import Head from "next/head";
import dynamic from "next/dynamic";

const Restaurants = dynamic(() => import("@/screens/HomeScreen"));
interface HomeProps {
  ALL_RESTAURANTS: IRestaurant[] | null;
  loading: boolean;
}

export default function Home({ ALL_RESTAURANTS, loading }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const restaurants = useMemo(() => {
    return ALL_RESTAURANTS.filter((res) => {
      return res.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, ALL_RESTAURANTS]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const errorMessage = "Couldn't find any restaurants";

  return (
    <div>
      <Head>
        <meta name="description" content="Restaurants list" />
      </Head>
      <Search label="Hitta din restaurang" onChange={handleSearchChange}>
        <AiOutlineFork color="white" />
      </Search>
      {!ALL_RESTAURANTS?.length && !loading && (
        <ErrorCard>{errorMessage}</ErrorCard>
      )}
      {!restaurants?.length && searchQuery && (
        <ErrorCard>{errorMessage}</ErrorCard>
      )}
      <Restaurants
        ALL_RESTAURANTS={searchQuery ? restaurants : ALL_RESTAURANTS}
      />
    </div>
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
        loading: res.loading,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        ALL_RESTAURANTS: [],
        adminIsOnline: false,
        costumerIsOnline: false,
        loading: false,
      },
    };
  }
}

Home.Layout = PrimaryLayout;
