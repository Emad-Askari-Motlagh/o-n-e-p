import React, { useEffect, useState } from "react";
import Input from "components/Input";
import { AiOutlineEdit } from "react-icons/ai";
import styles from "./styles.module.scss";
import Image from "next/image";
import Inputs from "./Inputs";
import Modal from "components/Modal";

export default function MenuEditor({ data, submit, restaurant, category }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <Image
          alt={data?.name}
          src={"/1.webp"}
          width={"100px"}
          height={"100px"}
        />
        <label>Name</label>
        <span>{data.name}</span>
        <span>{data.price}</span>

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
