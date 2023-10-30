import Image from "next/image";
import React from "react";
import styles from "./style.module.scss";
import Clickable from "./Clickable";
import Description from "./MenuDescription";

import {
  AddOrderMutationFn,
  RemoveOrderMutationFn,
} from "@/server/generated/graphql";

interface MenuItemProps {
  description: string;
  name: string;
  ImageSrc: string;
  removeOrder: RemoveOrderMutationFn;
  id: string;
  addOrder: AddOrderMutationFn;
  price: number;
  quantity: number;
  itemsChildren: JSX.Element;
}
const MenuItem = ({
  description,
  name,
  ImageSrc,
  removeOrder,
  id,
  addOrder,
  price,
  quantity,
}: MenuItemProps) => {
  const sum = price * quantity;
  return (
    <div className={styles.container}>
      <Description
        description={description}
        name={name}
        ImageSrc={ImageSrc}
        id={id}
      />
      <Clickable
        quantity={quantity}
        addOrder={addOrder}
        removeOrder={removeOrder}
        id={id}
      />
      <div className={styles.price_cont}>
        <span>{`${sum > 0 ? sum : 0},00 kr`}</span>
      </div>
    </div>
  );
};

export default MenuItem;
