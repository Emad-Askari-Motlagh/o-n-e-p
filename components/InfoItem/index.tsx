import PrimaryLayout from "@/components/Primary-layout";
import { useProvideAuth } from "hooks/Context.hook";
import React, { PropsWithChildren, useState, LegacyRef } from "react";
import styles from "./style.module.scss";
import { AiOutlineEdit } from "react-icons/ai";
import Modall from "@/components/Modal";
import Input from "@/components/Input";
import Button from "../Button";
import InfoEditor from "../InfoEditor/InfoItem";
import { EditUserInfoItemMutationFn } from "@/server/generated/graphql";

interface InfoItemProps {
  label: string;
  value: string;
  changeItem: EditUserInfoItemMutationFn;
  type: string;
  children: JSX.Element;
  myR: React.LegacyRef<HTMLDivElement>;
}
const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  changeItem,
  type,
  children,
  myR,
}: InfoItemProps) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.info_parent} ref={myR}>
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
