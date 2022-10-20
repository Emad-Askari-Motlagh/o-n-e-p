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
import { BiSearch, BiTrash } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import useOrders from "hooks/Order.hook";
import captalizeFirstLetter from "lib/captalizeFirstChar";
import Modal from "components/WarningModal";
import Search from "components/Search-form";
import searchByQuery from "lib/searchByQuery";
import ErrorCard from "components/ErrorCard";
import { useQuery } from "@apollo/client";
import { GET_PAYED_ORDERS } from "@/server/graphql/querys/querys.graphql";

const AdminsOrders = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();
  const [searchResult, setSearchResult] = useState<string>();
  const { data } = useQuery(GET_PAYED_ORDERS, {
    variables: { restaurant: router.query.name },
    onCompleted: (res) => {
      console.log(res);
    },
  });

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
  const orders = data?.PayedOrders;
  if (!orders?.length)
    return (
      <ErrorCard>
        <div className={styles.error_card}>
          <span style={{ fontWeight: 900 }}>OBS!</span>
          <br />
          <span>There isn`t any orther in history</span>
        </div>
      </ErrorCard>
    );
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
        <Search
          label={"Hitta din restaurang"}
          onChange={searchOverRestaurants}></Search>
      </div>

      <table>
        <tbody>
          <tr style={{ backgroundColor: "tomato" }}>
            <TableHeader>Date</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>quantity</TableHeader>
            <TableHeader>price</TableHeader>
            <TableHeader>Description</TableHeader>
          </tr>
          {Array.isArray(orders) &&
            orders.map((fact, i) => {
              return (
                <tr key={i}>
                  <TableData>{fact.createdAt.toLocaleString()}</TableData>
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
                  <TableData>
                    <BiTrash />
                  </TableData>
                </tr>
              );
            })}
        </tbody>
      </table>
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
