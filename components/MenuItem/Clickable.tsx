import {
  AddOrderMutationFn,
  RemoveOrderMutationFn,
} from "@/server/generated/graphql";
import React, { MouseEvent } from "react";
import styles from "./style.module.scss";

interface Props {
  removeOrder: MouseEvent<HTMLSpanElement> | RemoveOrderMutationFn;
  addOrder: MouseEvent<HTMLSpanElement> | AddOrderMutationFn;
  quantity: number;
  id: string;
}
export default function Clickable({
  removeOrder,
  addOrder,
  quantity,
  id,
}: Props) {
  return (
    <div className={styles.choose_part}>
      <span onClick={addOrder}>+</span>
      <span>{quantity}</span>
      <span onClick={removeOrder}>-</span>
    </div>
  );
}
