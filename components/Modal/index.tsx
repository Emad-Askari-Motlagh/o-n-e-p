import React, { ReactNode, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import { HtmlProps } from "next/dist/shared/lib/html-context";

interface ModalTypes {
  children: ReactNode;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  label: string;
  onExit?: () => void;
  onEnter?: () => void;
}
export default function Modall(
  { children, setIsModalOpen, isModalOpen, label, onExit, onEnter }: ModalTypes,
  props: HtmlProps
) {
  return (
    <>
      <Modal
        {...props}
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        keyboard={false}
        onExit={onExit}
        backdropClassName={styles.backdrop}
        contentClassName={styles.content}
        dialogClassName={styles.dialoge}
        className={styles.container}
        onEnter={onEnter}
        size="lg">
        <div className={styles.modal_cont}>
          <Modal.Header>
            <Modal.Title className={styles.title}>{label}</Modal.Title>
          </Modal.Header>
          <Modal.Body> {children}</Modal.Body>
          <Modal.Footer>
            {" "}
            <AiOutlineCloseCircle
              size={32}
              className={styles.close_icon}
              onClick={() => setIsModalOpen(false)}></AiOutlineCloseCircle>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
}
