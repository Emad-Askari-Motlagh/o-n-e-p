import Image from "next/image";
import React from "react";
import ItemsParent from "./ItemsParent";
import styles from "./style.module.scss";
import Selection from "../Selection";
import Form from "./Form";
import ChoisesCard from "./ChoisesCard";

const MenuItem = ({
  description,
  name,
  ImageSrc,
  removeOrder,
  id,
  addOrder,
  price,
  quantity,
}) => {
  const sum = price * quantity;
  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <ItemsParent name={name}>
          <Form>
            <Selection />
          </Form>
          <ChoisesCard costumerExtra={"costumerExtra"} />
        </ItemsParent>
      </div>
      <Image
        className={styles.image}
        src={ImageSrc}
        width={200}
        alt="Menu Item"
        height={200}
        layout="intrinsic"
      />

      <div className={styles.description}>
        <label>{name}</label>
        <p>{description}</p>
      </div>

      <div className={styles.choose_part}>
        <span
          onClick={() => {
            addOrder({
              variables: { productId: id },
            });
          }}>
          +
        </span>
        <span>{quantity}</span>
        <span
          onClick={() =>
            removeOrder({
              variables: { productId: id },
            })
          }>
          -
        </span>
      </div>
      <div className={styles.price_cont}>
        <span>{`${sum > 0 ? sum : 0},00 kr`}</span>
      </div>
    </div>
  );
};

export default MenuItem;
