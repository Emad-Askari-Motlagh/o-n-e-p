import React, { createRef, useState, useEffect } from "react";
import Modal from "react-modal";
import styles from "./Modal.module.scss";
import { Button, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import useDimensions from "hooks/useWindowDimensions";
import { useRouter } from "next/router";
import { AiFillCloseCircle } from "react-icons/ai";

export default function CategorysModal() {
  const divRef = createRef();
  var subtitle;
  const [selected, setSelected] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const dimensions = useDimensions();

  function openModal() {
    setIsOpen(true);
  }
  useEffect(() => {
    if (selected) {
      dispatch({
        type: "SET_CATEEGORY",
        payload: { type: selected },
      });
      router.push({ query: { ...router.query, category: [selected] } });
    }
  }, [selected, dispatch, router]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle && subtitle?.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div ref={divRef} id="root" className={styles.modalContainer}>
      <Button className={styles.modal_button} onClick={openModal}>
        Category...
        <AiFillCaretDown size={33} />
      </Button>
      <Modal
        htmlOpenClassName={styles.modal}
        style={{
          content: {
            width: dimensions.width > 700 ? "30vw" : "80vw",
            margin: "auto",
            textAlign: "center",
            borderRadius: "22px",
            backgroundColor: "rgba(89, 109, 114, 0.801)",
            height: "50%",
          },
          overlay: {
            backgroundColor: "rgba(89, 109, 114, 0.801)",
            WebkitBackdropFilter: "blur(2px)",
            backdropFilter: "blur(2px)",
          },
        }}
        bodyOpenClassName={styles.modal_body}
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal">
        <AiFillCloseCircle
          size={34}
          onClick={closeModal}
          style={{ position: "absolute", right: "4%" }}>
          close
        </AiFillCloseCircle>

        <Dropdown
          className={styles.modal_dropdown}
          onSelect={(value) => setSelected(value)}
          style={{ margin: "auto", width: "65%" }}>
          <Dropdown.Toggle
            style={{ backgroundColor: "black" }}
            id="dropdown-basic">
            select categorys...
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Home">Home</Dropdown.Item>
            <Dropdown.Item eventKey="Design">Design</Dropdown.Item>
            <Dropdown.Item eventKey="Football">Football</Dropdown.Item>
          </Dropdown.Menu>
          <h3 className={styles.selected_value}>{selected}</h3>
        </Dropdown>
      </Modal>
    </div>
  );
}
