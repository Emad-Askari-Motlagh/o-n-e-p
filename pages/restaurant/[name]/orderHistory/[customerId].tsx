import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./styles.module.scss";
import PrimaryLayout from "components/Primary-layout/index";
import { useRouter } from "node_modules/next/router";
import { MdOutlineExpandMore } from "react-icons/md";
import captalizeFirstLetter from "lib/captalizeFirstChar";
import Search from "components/Search-form";
import searchByQuery from "lib/searchByQuery";
import ErrorCard from "components/ErrorCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PAYED_ORDERS } from "@/server/graphql/querys/querys.graphql";
import { GET_BILL_INFO } from "@/server/graphql/querys/mutations.graphql";
import RecieptItem from "@/components/RecieptItem";
import Modall from "@/components/Modal";
import {
  GetBillInfoMutation,
  GetBillInfoMutationVariables,
  PayedOrdersQuery,
  PayedOrdersQueryVariables,
} from "@/server/generated/graphql";
import TableData from "@/components/Table/TableData";
import TableHeader from "@/components/Table/TableHeader";
import HistoryItem from "@/components/HistoryItem";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";

const OrdersHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const [BillData, setBillData] = useState();
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<string>();
  const { data, loading } = useQuery<
    PayedOrdersQuery,
    PayedOrdersQueryVariables
  >(GET_PAYED_ORDERS, {
    variables: { restaurant: router.query?.name as string },
  });
  const [getInfo, { data: billInfoData }] = useMutation<
    GetBillInfoMutation,
    GetBillInfoMutationVariables
  >(GET_BILL_INFO);
  function searchOverRestaurants(e) {
    try {
      e.preventDefault();
      //Filter the restaurants when user begin to search
      const query = e.target.value;
      setSearchResult(query);
    } catch (err) {
      console.log(err);
    }
  }

  function onClick(id: string) {
    setShowModal(!showModal);
    getInfo({
      variables: {
        restaurant: router.query.name as string,
        recieptId: id,
      },
    });
  }

  const orders = data?.PayedOrders;

  if (!orders?.length && !loading)
    return (
      <ErrorCard>
        <div className={styles.error_card}>
          <span style={{ fontWeight: 900 }}>OBS!</span>
          <br />
          <span>There isn`t any order in history</span>
        </div>
      </ErrorCard>
    );

  return (
    <div className={styles.container}>
      <Head>
        <title>OrdersHistory</title>
        <meta name="description" content="OrdersHistory page" />
      </Head>
      <AnimatedHeader>Order`s History</AnimatedHeader>
      <span style={{ marginLeft: "20px" }}>
        {new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate()}
      </span>

      <table>
        <tbody>
          <tr style={{ backgroundColor: "tomato" }}>
            <TableHeader>Date</TableHeader>
            <TableHeader>Payement_Id</TableHeader>
            <TableHeader>price</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
          {Array.isArray(orders) &&
            orders.map((fact, i) => {
              return (
                <React.Fragment key={fact?._id}>
                  <tr>
                    <TableData>
                      {new Date(fact?.date).toLocaleString()}
                    </TableData>
                    <TableData>
                      {captalizeFirstLetter(fact?._id as string)}
                    </TableData>
                    <TableData
                      style={{
                        tableLayout: "auto",
                        width: "15%",
                      }}>{`${fact?.price},kr`}</TableData>
                    <TableData style={{ tableLayout: "auto", width: "10%" }}>
                      <MdOutlineExpandMore
                        style={{ cursor: "pointer" }}
                        onClick={() => onClick(fact?._id as string)}
                      />
                    </TableData>
                  </tr>
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
      <Modall
        label="Factor Info"
        setIsModalOpen={setShowModal}
        isModalOpen={showModal}>
        <HistoryItem billInfo={billInfoData?.GetBillInfo} />
      </Modall>
    </div>
  );
};

export default OrdersHistory;
OrdersHistory.Layout = PrimaryLayout;
