import PrimaryLayout from "@/components/Primary-layout";
import { useProvideAuth } from "hooks/Context.hook";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import Modall from "@/components/Modal";
import Input from "@/components/Input";
import Button from "../Button";
import InfoEditor from "../InfoEditor/InfoItem";

const InfoItem = ({
  label,
  value,
  changeItem,
  type,
  children,
}: {
  label: string;
  value: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.info_parent}>
      <div className={styles.parent}>
        <div className={styles.info_section}>
          <label>{label}</label>
          <span>{value}</span>
        </div>
        <div className={styles.edit_section}>
          <AiOutlineEdit
            className={styles.edit_icon}
            onClick={() => setShowModal(true)}
          />
          {children}
          <Modall
            label={`Edit your ${label}`}
            setIsModalOpen={setShowModal}
            isModalOpen={showModal}>
            <InfoEditor
              placeHolder={value}
              label={label}
              changeItem={changeItem}
              type={type}></InfoEditor>
          </Modall>
        </div>
      </div>
    </div>
  );
};

export default InfoItem;
