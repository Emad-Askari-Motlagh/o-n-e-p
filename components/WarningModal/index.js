import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiFillBell } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";

export default function Modall(
  { children, setIsModalOpen, isModalOpen, label, onExit, button_label },
  props
) {
  return (
    <>
      <Modal
        {...props}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        keyboard={false}
        backdropClassName={styles.backdrop}
        contentClassName={styles.content}
        dialogClassName={styles.dialoge}
        className={styles.container}
        size="lg">
        <div className={styles.modal_cont}>
          <Modal.Body>
            <div className={styles.content_parent}>
              <div className={styles.body_part}>
                <AiFillBell className={styles.icon} />
                {children}
              </div>
              <div>
                <button
                  size={32}
                  className={styles.close_icon}
                  onClick={() => setIsModalOpen(false)}>
                  {button_label}
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
    </>
  );
}
