import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./styles.module.scss";
import Image from "next/image";
import Inputs from "./Inputs";
import Modal from "components/Modal";
import MenuItem from "../MenuItem";
import MenuUpdater from "../MenuUpdater";

export default function MenuEditor({ data, submit, restaurant, category }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        {data.images?.length &&
          data.images.map((res, i) => {
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
        style={{ width: "80%", margin: "auto" }}>
        <Inputs
          category={category}
          restaurant={restaurant}
          data={data}
          submit={submit}
        />
      </Modal>
    </div>
  );
}
