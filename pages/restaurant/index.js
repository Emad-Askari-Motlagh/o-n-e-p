import Head from "next/head";
import React, { Suspense, useEffect, useState } from "react";
import Home_screen from "screens/Home.Screen";
import { initializeApollo } from "@/lib/apollo/apollo-client";
import PrimaryLayout from "components/Primary-layout";
import { FETCH_ALL_RESTAURANTS } from "server/graphql/querys/querys.graphql";
import dbInit from "lib/dbInit";
import Search_form from "components/Search-form";
import { AiOutlineFork } from "react-icons/ai";

const Home = ({ ALL_RESTAURANTS, user }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchQeury, setSearchQuery] = useState();

  function searchOverRestaurants(e) {
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
      `{" "}
      <Search_form
        placeHolder={"Vilken restaurang letar du efter?"}
        label={"Hitta din restaurang"}
        onChange={searchOverRestaurants}>
        <AiOutlineFork color="white" />
      </Search_form>
      `
      <Home_screen
        ALL_RESTAURANTS={searchQeury ? restaurants : ALL_RESTAURANTS}
      />
    </>
  );
};

export async function getServerSideProps({ req }) {
  try {
    //Init mongoDb

    const ee = await dbInit();

    // //Init Apollo client
    const apolloClient = await initializeApollo();
    const res = await apolloClient.query({
      query: FETCH_ALL_RESTAURANTS,
    });

    //Get the cookie from the req
    return {
      props: {
        ALL_RESTAURANTS: res.data?.Restaurants ?? [],
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
