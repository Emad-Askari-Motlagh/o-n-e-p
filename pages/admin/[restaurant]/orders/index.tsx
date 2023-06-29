import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { MdOutlineBorderStyle, MdOutlineExpandMore } from "react-icons/md";
import { useQuery } from "@apollo/client";
import useOrders from "hooks/Order.hook";
import useEventSource from "hooks/EventSource.hook";
import {
  AdminOrdersQuery,
  AdminOrdersQueryVariables,
} from "@/server/generated/graphql";
import { GET_ADMIN_ORDERS } from "@/server/graphql/querys/querys.graphql";
import AnimatedHeader from "@/components/AnimatedHeader";
import PrimaryLayout from "@/components/PrimaryLayout";
import TableHeader from "@/components/Table/TableHeader";
import Warning from "@/components/Warning";
import Modal from "components/WarningModal";
import InfoModal from "components/Modal";
import AdminOrdersInfo from "@/components/AdminOrdersInfo";
import Head from "next/head";
import styles from "./orders.module.scss";
import OrderCard from "@/components/OrderCard";

const AdminsOrders = () => {
  const {
    data: AdminOrdersData,
    error: adminOrdersError,
    loading: adminOrdersLoading,
  } = useQuery<AdminOrdersQuery, AdminOrdersQueryVariables>(GET_ADMIN_ORDERS, {
    pollInterval: 150000,
  });
  const {
    data: livsAdminOrders,
  }: { data: typeof AdminOrdersData.AdminOrders } = useEventSource(
    `${process.env.SERVER_LINK}/api/adminOrders`
  );
  const { DeleteItemFromAdminList } = useOrders();
  const [showAlert, setShowAlert] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [currentOrderInfo, setCurrentOrderInfo] = useState<{
    _id: string;
    extra: { name: string; quantity: string }[];
    description: string;
  }>();

  const orders = livsAdminOrders?.length
    ? livsAdminOrders
    : AdminOrdersData?.AdminOrders;

  if (adminOrdersLoading) {
    return <AiOutlineLoading3Quarters style={{ color: "#fff" }} />;
  }

  if (adminOrdersError && !adminOrdersLoading) {
    return (
      <Warning
        label="Orders"
        message="Unexpected error happened. Please try again later"
      />
    );
  }

  if (!orders?.length) {
    return null;
  }

  function onClick(id: string, order: typeof currentOrderInfo) {
    setCurrentOrderInfo(order);
    setInfoOpen(true);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Orders</title>
        <meta name="description" content="Admin Orders page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedHeader Logo={<MdOutlineBorderStyle />}>
        Admin`s Orders
      </AnimatedHeader>
      <span style={{ marginLeft: "20px" }}>
        {new Date().toLocaleDateString()}
      </span>
      <table>
        <tbody>
          <tr style={{ backgroundColor: "tomato" }}>
            <TableHeader>Table</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>quantity</TableHeader>
            <TableHeader>price</TableHeader>
            <TableHeader>Order Time</TableHeader>
            <TableHeader>View</TableHeader>
            <TableHeader>
              <BiTrash />
            </TableHeader>
          </tr>
          {
            <OrderCard
              orders={orders}
              onClick={onClick}
              onDeleteItem={(item) =>
                DeleteItemFromAdminList({
                  variables: {
                    itemId: item._id,
                    costumerId: item.costumer._id,
                  },
                })
              }
            />
          }
        </tbody>
      </table>
      <InfoModal
        setIsModalOpen={setInfoOpen}
        isModalOpen={infoOpen}
        label="Orders's extra info">
        <div>
          <AdminOrdersInfo currentOrderInfo={currentOrderInfo} />
        </div>
      </InfoModal>
      <Modal
        setIsModalOpen={setShowAlert}
        isModalOpen={showAlert}
        button_label="Let's see the orders"
        label="New order">
        <div>
          <span style={{ color: "wheat" }}>New order</span>
          <audio autoPlay>
            <source src="/alert2.mp3" type="audio/mpeg" />
          </audio>
        </div>
      </Modal>
    </div>
  );
};

export default AdminsOrders;
AdminsOrders.Layout = PrimaryLayout;
