import Image from "next/image";
import React, { FC } from "react";
import styles from "./styles.module.scss";
import {
  AddOrderMutationFn,
  RemoveOrderMutationFn,
} from "@/server/generated/graphql";

interface SummaryItemProps {
  name: string;
  ImageSrc?: string;
  removeOrder: RemoveOrderMutationFn;
  id: string;
  addOrder: AddOrderMutationFn;
  price: number;
  quantity: number;
  description: string;
}

const SummaryItem: FC<SummaryItemProps> = ({
  name,
  ImageSrc,
  removeOrder,
  id,
  addOrder,
  price,
  quantity,
  description,
}) => {
  const sum = price * quantity;

  return (
    <div className={styles.container}>
      {/* Product Image */}
      {ImageSrc && (
        <Image
          className={styles.image}
          src={ImageSrc}
          alt="/Summary"
          width={80}
          height={80}
          layout="fixed"
        />
      )}

      {/* Product Description */}
      <div className={styles.description}>
        <label>{name}</label>
      </div>

      {/* Quantity */}
      <div className={styles.quantity_parent}>
        <span
          className={styles.plus_button}
          onClick={() => {
            addOrder({
              variables: { productId: id },
            });
          }}>
          +
        </span>
        <span>{quantity}</span>
        <span
          className={styles.minus_button}
          onClick={() => {
            removeOrder({
              variables: { productId: id },
            });
          }}>
          -
        </span>
      </div>

      {/* Price */}
      <div className={styles.price_cont}>
        <span>{`${sum},00 kr`}</span>
      </div>
    </div>
  );
};

export default SummaryItem;
