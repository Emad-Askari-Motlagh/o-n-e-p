import React, { useState } from "react";
import TextArea from "../TextArea";
import styles from "./styles.module.scss";
import { CgDetailsMore } from "react-icons/cg";

export default function TimeItem({ time }) {
  const [descriptionWindow, openDescriptionWindow] = useState(false);
  return (
    <div className={styles.time_item}>
      <CgDetailsMore
        className={styles.more_icon}
        onClick={() => openDescriptionWindow(!descriptionWindow)}
      />
      <div>
        <span>{`Clockan ${time}`}</span>
        {descriptionWindow && (
          <TextArea width="200px" height="200px" placeholder={"Description"} />
        )}
      </div>{" "}
    </div>
  );
}
