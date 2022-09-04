import React, { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import "bootstrap/dist/css/bootstrap.css";
import { Alert, Container, Form, Button } from "react-bootstrap";
import styles from "./orders.module.scss";
import { connect } from "socket.io-client";
import useForm from "hooks/Form.hook";
import PrimaryLayout from "components/Primary-layout/index";
import { useRouter } from "node_modules/next/router";
import { BiTrash, BiScreenshot } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import useOrders from "hooks/useOrder";
import axios from "axios";
import io from "socket.io-client";

const W = () => {
  const { query } = useRouter();
  const [text, setText] = useForm("text");
  const [messages, setMessages] = useForm("messages", []);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const broadcastButton = useRef(null);

  const { AdminOrders, newUi } = useOrders();
  // const socketUrl = "wss://order-test-app.vercel.app/api/ws";
  const socketUrl = "ws://localhost:3000/api/ws";
  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(socketUrl, {
    onOpen: () => console.log("opened"),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
  });
  async function connect_to_socket() {
    try {
      // await axios.get("/api/ws");
      // socket.on("connect_error", (err) => {
      //   console.log(`connect_error due to ${err.message}`);
      // });
      // socket.on("disconnect", () => {
      //   console.log("disconnect");
      // });
      // socket.on("orders", (data) => {
      //   const fetchedData = JSON.parse(data);
      //   setData(fetchedData);
      //   console.log("orders", JSON.parse(data));
      // });
      // socket.on("disconnect", () => {
      //   console.log("disconnect");
      // });
    } catch (err) {
      console.log(err);
    }
  }

  async function connect_to_socket1() {
    try {
      const sse = new EventSource(`${process.env.SERVER_LINK}/api/events`, {
        withCredentials: true,
      });
      function getRealtimeData(data) {
        console.log(data);
        setData(data);
        // process the data here,
        // then pass it to state to be rendered
      }
      sse.onmessage = (e) => getRealtimeData(JSON.parse(e?.data));
      sse.onerror = (err) => {
        console.log(err);
        // error log here

        sse.close();
      };
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    connect_to_socket();
  }, []);

  const callApiRouteThatWillEmitEvent = () => {
    sendMessage("ok");
  };
  const orders = data?.length ? data : AdminOrders;
  // const orders = data;
  return (
    <div className={styles.container}>
      <span className={styles.restaurant}>{query.name}</span>
      {/* {error && <ApolloError error={error} />} */}
      <table>
        <thead>
          <tr style={{ backgroundColor: "tomato" }}>
            <TableHeader>Table</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>quantity</TableHeader>
            <TableHeader>price</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>View</TableHeader>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(orders) &&
            orders?.map((fact, i) => (
              <tr key={i}>
                <TableData>{fact?.costumer?.table}</TableData>
                <TableData>{fact?.product?.name}</TableData>
                <TableData color={fact?.orderQuantity <= 1 ? "white" : "red"}>
                  {fact?.orderQuantity}
                </TableData>
                <TableData>{fact?.product?.price}</TableData>
                <TableData>
                  <BiTrash>{fact?.product?.price}</BiTrash>
                </TableData>
                <TableData>
                  <FiEye>{fact?.product?.price}</FiEye>
                </TableData>
              </tr>
            ))}
        </tbody>
      </table>
      <article>
        <button onClick={callApiRouteThatWillEmitEvent}>call API</button>
      </article>
    </div>
  );
};
const TableData = ({ children, color }) => (
  <td>
    <span style={{ color }}>{children}</span>
  </td>
);

const TableHeader = ({ children }) => (
  <th className={styles.table_header}>
    <span>{children}</span>
  </th>
);

export default W;
