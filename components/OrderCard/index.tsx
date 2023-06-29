import React from "react";
import TableData from "../Table/TableData";
import captalizeFirstLetter from "@/lib/captalizeFirstChar";
import { MdOutlineExpandMore } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import style from "./orders.module.scss";

export default function OrderCard({ onClick, orders, onDeleteItem }) {
  return (
    <>
      {orders.map((order, i) => (
        <tr key={i}>
          <TableData style={{ tableLayout: "auto", width: "10%" }}>
            {order?.costumer?.table}
          </TableData>
          <TableData>
            {captalizeFirstLetter(order?.product?.name as string)}
          </TableData>
          <TableData
            style={{ tableLayout: "auto", width: "10%" }}
            color={order?.orderQuantity <= 1 ? "white" : "tomato"}>
            {order?.orderQuantity}
          </TableData>
          <TableData
            style={{
              tableLayout: "auto",
              width: "15%",
            }}>{`${order?.product?.price}.00 kr`}</TableData>
          <TableData>{new Date(order?.date).toLocaleString()}</TableData>
          <TableData style={{ tableLayout: "auto", width: "10%" }}>
            <MdOutlineExpandMore
              style={{ cursor: "pointer" }}
              onClick={() => onClick(order?._id as string, order)}
            />
          </TableData>
          <TableData style={{ tableLayout: "auto", width: "5%" }}>
            <BiTrash
              style={{ cursor: "pointer" }}
              onClick={() => onDeleteItem(order)}
            />
          </TableData>
        </tr>
      ))}
    </>
  );
}
