import React, { useEffect, useRef, useState } from "react";

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

const Kontakt = () => {
  const { query } = useRouter();
  const [text, setText] = useForm("text");
  const [messages, setMessages] = useForm("messages", []);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const broadcastButton = useRef(null);

  const { AdminOrders, newUi } = useOrders();

  async function connect_to_socket1() {
    try {
      const evtSource = new EventSource(
        `${process.env.SERVER_LINK}/api/events`
      );
      evtSource.onmessage = (event) => {
        console.log(event.data);
        setData(JSON.parse(event.data));
      };
      evtSource.onerror = (event) => {
        console.log(event);
      };
      evtSource.onopen = (event) => {
        console.log("open");
      };

      function getRealtimeData(data) {
        console.log(data);
        setData(data);
        // process the data here,
        // then pass it to state to be rendered
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    connect_to_socket1();
  }, []);

  const callApiRouteThatWillEmitEvent = () => {};
  // const orders = clientOrders?.length ? clientOrders : AdminOrders;
  const orders = data;
  return (
    <div className={styles.container}>
      <span className={styles.restaurant}>{query.name}</span>
      {/* {error && <ApolloError error={error} />} */}

      {Array.isArray(orders) && (
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
      )}

      <article>
        <button onClick={callApiRouteThatWillEmitEvent}>call API</button>
      </article>
    </div>
  );
};
const TableData = ({ children, color }) => <td>{children}</td>;

const TableHeader = ({ children }) => (
  <th className={styles.table_header}>{children}</th>
);
// export async function getServerSideProps() {
//   const connected = await fetch(`${process.env.SERVER_LINK}/api/socketio`);
//   return {
//     props: {
//       CONNECTED: connected.ok ? true : false,
//     },
//   };
// }
export default Kontakt;
