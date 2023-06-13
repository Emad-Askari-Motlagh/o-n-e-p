import React, {
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./orders.module.scss";
import PrimaryLayout from "components/Primary-layout/index";
import { FiEye } from "react-icons/fi";
import useOrders from "hooks/Order.hook";
import captalizeFirstLetter from "lib/captalizeFirstChar";
import Modal from "components/WarningModal";
import InfoModal from "components/Modal";
import Search from "components/Search-form";
import Warning from "@/components/Warning";
import { MdOutlineExpandMore } from "react-icons/md";
import AdminOrdersInfo from "@/components/AdminOrdersInfo";
import TableData from "@/components/Table/TableData";
import TableHeader from "@/components/Table/TableHeader";
import { BiTrash } from "react-icons/bi";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";
import useEventSource from "hooks/EventSource.hook";

const AdminsOrders = () => {
  const [showAlert, setShowAlert] = useState(false);

  const [infoOpen, setInfoOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<string>();
  const [error, setError] = useState(false);
  const { data } = useEventSource(`${process.env.SERVER_LINK}/api/adminOrders`);
  const [currentOrderInfo, setCurrentOrderInfo] = useState<{
    _id: string;
    extra: { name: string; quantity: string }[];
    description: string;
  }>();
  const {
    AdminOrders,
    adminOrdersError,
    DeleteItemFromAdminList,
    adminOrdersLoading,
  } = useOrders();
  const date = new Date();

  function onClick(id: string, fact: typeof currentOrderInfo) {
    setCurrentOrderInfo(fact);
    setInfoOpen(true);
  }
  function onDeleteItem(item) {
    DeleteItemFromAdminList({
      variables: {
        itemId: item._id,
        costumerId: item.costumer._id,
      },
    });
  }
  const orders = data?.length ? data : AdminOrders;
  if (!orders?.length) return <Warning label="Orders" message="Loading..." />;
  if ((error || adminOrdersError) && !adminOrdersLoading)
    return (
      <Warning
        label="Orders"
        message="Unexpected error happend. Please try later"
      />
    );
  return (
    <div className={styles.container}>
      <Head>
        <title>Admin Orders</title>
        <meta name="description" content="Admin Orders page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedHeader>Admin`s Orders</AnimatedHeader>
      <span style={{ marginLeft: "20px" }}>
        {date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()}
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
          {Array.isArray(orders) &&
            orders.map((fact, i) => {
              return (
                <tr key={i}>
                  <TableData style={{ tableLayout: "auto", width: "10%" }}>
                    {fact?.costumer?.table}
                  </TableData>
                  <TableData>
                    {captalizeFirstLetter(fact?.product?.name as string)}
                  </TableData>
                  <TableData
                    style={{ tableLayout: "auto", width: "10%" }}
                    color={
                      (fact?.orderQuantity as number) <= 1 ? "white" : "tomato"
                    }>
                    {fact?.orderQuantity}
                  </TableData>
                  <TableData
                    style={{
                      tableLayout: "auto",
                      width: "15%",
                    }}>{`${fact?.product?.price}.00 kr`}</TableData>
                  <TableData>{new Date(fact?.date).toLocaleString()}</TableData>
                  <TableData style={{ tableLayout: "auto", width: "10%" }}>
                    <MdOutlineExpandMore
                      style={{ cursor: "pointer" }}
                      onClick={() => onClick(fact?._id as string, fact)}
                    />
                  </TableData>
                  <TableData style={{ tableLayout: "auto", width: "5%" }}>
                    <BiTrash
                      style={{ cursor: "pointer" }}
                      onClick={() => onDeleteItem(fact)}
                    />
                  </TableData>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div>
        <InfoModal
          setIsModalOpen={setInfoOpen}
          isModalOpen={infoOpen}
          label="Orders`s extra info">
          {
            <div>
              <AdminOrdersInfo currentOrderInfo={currentOrderInfo} />
            </div>
          }
        </InfoModal>
      </div>
      <div>
        <Modal
          setIsModalOpen={setShowAlert}
          isModalOpen={showAlert}
          button_label="Let`s see the orders"
          label="New order">
          <div>
            <span style={{ color: "wheat" }}>New order</span>
            <audio autoPlay>
              <source src="/alert2.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminsOrders;
AdminsOrders.Layout = PrimaryLayout;
