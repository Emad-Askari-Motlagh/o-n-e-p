import React, { ChangeEvent, useEffect, useState } from "react";
import Modal from "components/Modal";
import MenuUpdater from "components/MenuUpdater";
import SucceedMessage from "../Succeed-Message";
import Image from "next/image";
import styles from "./styles.module.scss";
import FileInput from "components/Image-Input";
import Input from "components/Input";
import Button from "../Button";
import SelectInput from "../SelectInput";
import { AiOutlineEdit } from "react-icons/ai";
import MenuSubItem from "components/RestaurantSubItem";

interface CategoryProps {
  name: string;
  image: string;
  submit: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChange: (e: ChangeEvent) => void;
  onChangeImage: (e: ChangeEvent) => void;
  submited: boolean;
}
export default function CategoryEditor({
  name,
  image,
  submit,
  onChange,
  onChangeImage,
  submited,
}: CategoryProps) {
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.input_container}>
      <AiOutlineEdit
        className={styles.edit_button}
        onClick={() => setIsOpen(!isOpen)}
      />
      <MenuSubItem
        label={name}
        endPoint={`${name}`}
        image={image}></MenuSubItem>

      <Modal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        label="Category Editor">
        <form onSubmit={submit}>
          <div className={styles.image}>
            {image && (
              <Image
                alt="ok"
                width={100}
                height={100}
                src={newName ? newName : image}></Image>
            )}
            <FileInput
              label="Upload Image"
              onChange={(e) => {
                if (e.target.files)
                  onChangeImage(e),
                    setNewName(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <SelectInput
            name={"cat"}
            label="Choose a category"
            value={["main course", "drink", "starter"]}
            onSelect={onChange}></SelectInput>
          {submited && (
            <SucceedMessage>Item Changed Successfuly</SucceedMessage>
          )}
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </div>
  );
}
