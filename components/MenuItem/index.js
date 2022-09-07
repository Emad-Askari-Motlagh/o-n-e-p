import Image from "next/image";
import React from "react";
import ItemsParent from "./ItemsParent";
import styles from "./style.module.scss";
import Selection from "../Selection";
import Form from "./Form";
import ChoisesCard from "./ChoisesCard";
import Clickable from "./Clickable";
import Description from "./MenuDescription";
import { CgMore } from "react-icons/cg";

const MenuItem = ({
  description,
  name,
  ImageSrc,
  removeOrder,
  id,
  addOrder,
  price,
  quantity,
  itemsChildren,
}) => {
  const sum = price * quantity;
  return (
    <div className={styles.container}>
      <div className={styles.extraParent}>
        <ItemsParent name={name} Icon={CgMore}>
          {itemsChildren}
        </ItemsParent>
      </div>
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
      />
      <div className={styles.price_cont}>
        <span>{`${sum > 0 ? sum : 0},00 kr`}</span>
      </div>
    </div>
  );
};

export default MenuItem;
