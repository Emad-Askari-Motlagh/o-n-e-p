import React, { useEffect, useRef, useState } from "react";

import styles from "./orders.module.scss";
import { connect } from "socket.io-client";
import useForm from "../hooks/Form.hook";
import { useRouter } from "next/router";
import { BiTrash, BiScreenshot } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import useOrders from "../hooks/useOrder";
import { GET_ADMIN_ORDERS } from "../server/graphql/querys/subscriptions";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
const Kontakt = () => {
  //useReactiveVar
  const { query } = useRouter();
  const [text, setText] = useForm("text");
  const [messages, setMessages] = useForm("messages", []);
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const broadcastButton = useRef(null);

  const { AdminOrders, newUi } = useOrders();
  const { data: clientOrders } = useSubscription(GET_ADMIN_ORDERS, {
    onsubscriptiondata: (dataa) => {
      console.log(dataa);
    },
    onError: () => {
      console.log("error");
    },
  });
  async function connect_to_socket() {
    try {
      // await axios.get("/api/socket");
    } catch (err) {
      console.log(err);
    }
  }

  async function connect_to_socket1() {
    try {
      const evtSource = new EventSource(
        `${process.env.SERVER_LINK}/api/events`
      );
      evtSource.onmessage = (event) => {
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

      {Array.isArray(orders) &&
        orders?.map((fact, i) => <div key={i}>{fact.orderQuantity}</div>)}

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
// export async function getServerSideProps() {
//   const connected = await fetch(`${process.env.SERVER_LINK}/api/socketio`);
//   return {
//     props: {
//       CONNECTED: connected.ok ? true : false,
//     },
//   };
// }
export default Kontakt;
