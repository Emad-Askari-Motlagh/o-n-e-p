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

const AdminsOrders = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [data, setData] = useState([]);
  const [infoOpen, setInfoOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<string>();
  const { AdminOrders } = useOrders();
  const date = new Date();

  async function connect_to_socket1() {
    try {
      const evtSource = new EventSource(
        `${process.env.SERVER_LINK}/api/adminOrders`
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
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    connect_to_socket1();
  }, []);

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
  const orders = data?.length ? data : AdminOrders;
  if (!orders?.length)
    return <Warning label="Orders" message="You have not any orders" />;
  return (
    <div className={styles.container}>
      <span style={{ marginLeft: "20px" }}>
        {date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate()}
      </span>
      <div className={styles.search_parent} style={{ margin: "20px" }}>
        <Search
          label={"Hitta din restaurang"}
          onChange={searchOverRestaurants}></Search>
      </div>

      <table>
        <tbody>
          <tr style={{ backgroundColor: "tomato" }}>
            <TableHeader>Table</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>quantity</TableHeader>
            <TableHeader>price</TableHeader>
            <TableHeader>Order Time</TableHeader>
            <TableHeader>View</TableHeader>
          </tr>
          {Array.isArray(orders) &&
            orders.map((fact, i) => {
              return (
                <tr key={i}>
                  <TableData>{fact?.costumer?.table}</TableData>
                  <TableData>
                    {captalizeFirstLetter(fact?.product?.name as string)}
                  </TableData>
                  <TableData
                    color={
                      (fact?.orderQuantity as number) <= 1 ? "white" : "tomato"
                    }>
                    {fact?.orderQuantity}
                  </TableData>
                  <TableData>{fact?.product?.price}</TableData>
                  <TableData>{new Date(fact?.date).toLocaleString()}</TableData>
                  <TableData>
                    <FiEye onClick={() => setInfoOpen(true)} />
                    <InfoModal
                      label="Factor Info"
                      setIsModalOpen={setInfoOpen}
                      isModalOpen={infoOpen}>
                      <div style={{ color: "white" }}>
                        <span>Transaction`s Time:</span>
                        <span>{}</span>
                      </div>
                      <div className={styles.price_parent}>
                        <span>Total Amount:</span>
                        <span>{fact!.price} kr</span>
                      </div>
                    </InfoModal>
                  </TableData>
                </tr>
              );
            })}
        </tbody>
      </table>

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
const TableData = ({
  children,
  color,
}: {
  children: ReactNode;
  color?: string;
}) => <td style={{ color }}>{children}</td>;

const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className={styles.table_header}>{children}</th>
);

export default AdminsOrders;
AdminsOrders.Layout = PrimaryLayout;
