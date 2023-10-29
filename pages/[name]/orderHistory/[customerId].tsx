import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./styles.module.scss";
import PrimaryLayout from "@/components/PrimaryLayout/index";
import { useRouter } from "node_modules/next/router";
import { MdOutlineExpandMore } from "react-icons/md";
import captalizeFirstLetter from "lib/captalizeFirstChar";
import ErrorCard from "components/ErrorCard";
import Modall from "@/components/Modal";
import TableData from "@/components/Table/TableData";
import TableHeader from "@/components/Table/TableHeader";
import HistoryItem from "@/components/HistoryItem";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import { BiHistory } from "react-icons/bi";
import useOrders from "hooks/Order.hook";

const OrdersHistory = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const {
    payedOrders: { data, loading },
    getBillInfo: [getInfo, { data: billInfoData }],
  } = useOrders();

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
        <title>Orders History</title>
        <meta name="description" content="Costumer order History page" />
      </Head>
      <AnimatedHeader Logo={<BiHistory />}>Order`s History</AnimatedHeader>
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
