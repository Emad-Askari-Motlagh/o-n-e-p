import React, { useRef, useState } from "react";
import Modal from "components/Modal";

import styles from "./style.module.scss";
import Selection from "../Selection";

export default function MoreOnItem({ name, children, Icon }) {
  const [isOpen, SetIsOpen] = useState(false);
  const description = useRef();
  function openModal() {
    SetIsOpen(!isOpen);
    if (isOpen) {
      description.current.scrollIntoView();
    }
  }

  return (
    <div className={styles.extraContainer}>
      <Icon className={styles.more_icon} onClick={openModal} />
      <Modal isModalOpen={isOpen} setIsModalOpen={SetIsOpen} label={name}>
        {children}
      </Modal>
    </div>
  );
}
