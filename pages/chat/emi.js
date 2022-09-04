import Head from "next/head";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "node_modules/axios/index";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/useOrder";
import styles from "./orders.module.scss";

import { BiTrash, BiScreenshot } from "react-icons/bi";
import { FiEye } from "react-icons/fi";

function Kontakt() {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const { AdminOrders, newUi } = useOrders();

  const [pusher] = useState(
    new Pusher("ce9c4185dc0cc15e2fbe", {
      cluster: "eu",
      // activityTimeout: 0,
    })
  );
  useEffect(() => {
    Pusher.logToConsole = true;
    const channel = pusher.subscribe("rooted-temple-840");

    channel.bind("message", function (data) {
      console.log(data);
      setMessages(JSON.parse(data.message));
    });
    channel.bind("pusher:subscription_succeeded", function (members) {
      alert("successfully subscribed!");
    });
    () => pusher.unsubscribe("my-channel");
  }, [pusher]);

  const submit = async (e) => {
    e.preventDefault();

    await fetch(`${process.env.SERVER_LINK}/api/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    });

    setMessage("");
  };
  async function getMore() {
    await axios.post(`${process.env.SERVER_LINK}/api/pusher/chat`);
  }

  // const orders = messages;
  const orders = messages.length ? messages : AdminOrders;
  return (
    <div className={styles.container}>
      <span className={styles.restaurant}>query</span>
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
        <button onClick={getMore}>call API</button>
      </article>
    </div>
  );
}
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
// export async function getStaticProps() {
//   await dbInit();
//   const orders = await orderschema
//     .find({})
//     .populate("product")
//     .populate("costumer");
//   if (orders?.length) {
//     return {
//       props: {
//         ORDERS: JSON.stringify(orders),
//       },
//       revalidate: 10, // In seconds
//     };
//   } else {
//     return {
//       props: {
//         ORDERS: null,
//       },
//       revalidate: 10, // In seconds
//     };
//   }
// }
export default Kontakt;
Kontakt.Layout = PrimaryLayout;
