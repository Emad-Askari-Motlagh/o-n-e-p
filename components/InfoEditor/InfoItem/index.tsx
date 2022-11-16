import PrimaryLayout from "@/components/Primary-layout";
import { useProvideAuth } from "hooks/Context.hook";
import React, { useState } from "react";
import styles from "./style.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";

const InfoEditor = ({ label, placeHolder, changeItem, type }) => {
  const [value, setValue] = useState();
  function change() {
    changeItem({ variables: { name: label, value } });
  }
  return (
    <div className={styles.info_editor}>
      <div>
        <label>{label}</label>
        <Input
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeHolder}></Input>
        <Button onClick={change}>Submit your change</Button>
      </div>
    </div>
  );
};
export default InfoEditor;
