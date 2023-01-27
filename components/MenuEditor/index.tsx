import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./styles.module.scss";
import Image from "next/image";
import Inputs from "./MenuItem";
import Modal from "components/Modal";
import MenuItem from "../MenuItem";
import MenuUpdater from "../MenuUpdater";
import { UpdateMenuItemsMutationFn } from "@/server/generated/graphql";
import Input from "../Search-form/Input";
import Button from "../Button";

interface MenuEditor {
  data: { images: [string]; name: string; price: number };
  submit: UpdateMenuItemsMutationFn;
  restaurant: string;
  category: string;
  isSaved: boolean;
  subCat: string[];
}
export default function MenuEditor({
  data,
  submit,
  restaurant,
  category,
  isSaved,
  subCat,
}: MenuEditor) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        {data.images?.length &&
          data.images?.map((res, i) => {
            return (
              <div key={i} className={styles.image_container}>
                <Image
                  alt={res}
                  src={res}
                  className={styles.image}
                  width={"100px"}
                  height={"100px"}
                />
              </div>
            );
          })}
        <MenuUpdater name={data.name} price={data.price} />

        <AiOutlineEdit
          className={styles.edit_button}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <Modal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        label="Edit menu item">
        <Inputs
          category={category}
          restaurant={restaurant}
          data={data}
          submit={submit}
          subCat={subCat}
        />
      </Modal>
    </div>
  );
}
