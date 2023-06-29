import React, { ReactNode } from "react";
import styles from "./styles.module.scss";
import { AiFillBell } from "react-icons/ai";
import { Modal as BootstrapModal } from "react-bootstrap";

interface ModalProps {
  children: ReactNode;
  setIsModalOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  label: string;
  onExit?: () => void;
  button_label: string;
}

export default function Modal({
  children,
  setIsModalOpen,
  isModalOpen,
  label,
  onExit,
  button_label,
}: ModalProps) {
  return (
    <>
      <BootstrapModal
        show={isModalOpen}
        onHide={() => setIsModalOpen(false)}
        keyboard={false}
        backdropClassName={styles.backdrop}
        contentClassName={styles.content}
        dialogClassName={styles.dialoge}
        className={styles.container}
        size="lg">
        <div className={styles.modal_cont}>
          <BootstrapModal.Body>
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
          </BootstrapModal.Body>
        </div>
      </BootstrapModal>
    </>
  );
}
