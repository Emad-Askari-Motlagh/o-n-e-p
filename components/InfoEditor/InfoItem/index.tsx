import React, { useState } from "react";
import styles from "./style.module.scss";
import Input from "@/components/Input";
import Button from "@/components/Button";
import SucceedMessage from "@/components/Succeed-Message";
import {
  EditRestaurantInfoItemMutation,
  EditRestaurantInfoItemMutationFn,
  EditUserInfoItemMutationFn,
} from "@/server/generated/graphql";

interface InfoEditorProps {
  label: string;
  placeHolder: string;
  changeItem: EditRestaurantInfoItemMutationFn;
  type: string;
}

const InfoEditor: React.FC<InfoEditorProps> = ({
  label,
  placeHolder,
  changeItem,
  type,
}) => {
  const [value, setValue] = useState<any>();
  const [changedSuccess, setChangedSuccess] = useState(false);

  function change(e) {
    changeItem({
      variables: { restaurant: "Göteburgare", name: label, value },
      onCompleted: () => {
        setChangedSuccess(true);
      },
      onError: (error) => {
        error.graphQLErrors.map((r) => console.log(r.extensions));
      },
    });
  }

  return (
    <div className={styles.info_editor}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        <label>{label}</label>
        <Input
          width="80%"
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          value={value ?? placeHolder}
        />
        <Button type="submit" onClick={change}>
          Submit your change
        </Button>
        {changedSuccess && <SucceedMessage>The item changed</SucceedMessage>}
      </div>
    </div>
  );
};

export default InfoEditor;
