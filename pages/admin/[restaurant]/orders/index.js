import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./orders.module.scss";
import PrimaryLayout from "components/Primary-layout/index";
import { useRouter } from "node_modules/next/router";
import { BiSearch, BiTrash } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import useOrders from "hooks/useOrder";
import captalizeFirstLetter from "lib/captalizeFirstChar";
import Modal from "components/WarningModal";
import Search from "components/Search-form";

const Kontakt = () => {
  const { query } = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const { AdminOrders } = useOrders();
  const date = new Date();
  async function connect_to_socket1() {
    try {
      const evtSource = new EventSource(
        `${process.env.SERVER_LINK}/api/events`
      );
      evtSource.onmessage = (event) => {
        setShowAlert(true);

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
  const orders = data?.length ? data : AdminOrders;

  return (
    <div className={styles.container}>
      {/* <span style={{ marginLeft: "20px" }}>
        {date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()}
      </span> */}
      <div className={styles.search_parent} style={{ margin: "20px" }}>
        <Search placeHolder={"Filter"} label={"Hitta bord"} onChange={""} />
      </div>

      {Array.isArray(orders) && (
        <table>
          <tbody>
            <tr style={{ backgroundColor: "tomato" }}>
              <TableHeader>Table</TableHeader>
              <TableHeader>Name</TableHeader>
              <TableHeader>quantity</TableHeader>
              <TableHeader>price</TableHeader>
              <TableHeader>Description</TableHeader>
              <TableHeader>View</TableHeader>
            </tr>
            {Array.isArray(orders) &&
              orders?.map((fact, i) => (
                <tr key={i}>
                  <TableData>{fact?.costumer?.table}</TableData>
                  <TableData>
                    {captalizeFirstLetter(fact?.product?.name)}
                  </TableData>
                  <TableData
                    color={fact?.orderQuantity <= 1 ? "white" : "tomato"}>
                    {fact?.orderQuantity}
                  </TableData>
                  <TableData>{fact?.product?.price}</TableData>
                  <TableData>
                    <BiTrash />
                  </TableData>
                  <TableData>
                    <FiEye />
                  </TableData>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div>
        {true && (
          <Modal
            setIsModalOpen={setShowAlert}
            isModalOpen={showAlert}
            button_label="Let`s see the orders">
            <div>
              <span style={{ color: "wheat" }}>New order</span>
              <audio autoPlay>
                <source src="/alert2.mp3" type="audio/mpeg" />
              </audio>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};
const TableData = ({ children, color }) => (
  <td style={{ color }}>{children}</td>
);

const TableHeader = ({ children }) => (
  <th className={styles.table_header}>{children}</th>
);

export default Kontakt;
Kontakt.Layout = PrimaryLayout;
