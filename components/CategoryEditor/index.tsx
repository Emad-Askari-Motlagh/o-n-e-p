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
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import MenuSubItem from "components/RestaurantSubItem";
import {
  DeleteMenuCategoryMutationFn,
  UpdateCategoryMutationFn,
} from "@/server/generated/graphql";

interface CategoryProps {
  name: string;
  image: string;
  submit: UpdateCategoryMutationFn;
  onChange: (e: ChangeEvent) => void;
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  submited: boolean;
  deleteCategory: DeleteMenuCategoryMutationFn;
  id: string;
  restaurant: string;
}
export default function CategoryEditor({
  name,
  image,
  submit,
  onChange,
  onChangeImage,
  submited,
  deleteCategory,
  id,
  restaurant,
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}>
          <div
            className={styles.image}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}>
            {image && (
              <Image
                style={{
                  color: "white",
                }}
                alt="ok"
                width={100}
                height={100}
                src={image}></Image>
            )}
            <FileInput
              label="Upload Image"
              onChange={(e) => {
                if (e.target.files)
                  onChangeImage(e),
                    setNewName(URL.createObjectURL(e.target.files[0]));
              }}
            />
            <AiFillDelete
              onClick={() =>
                deleteCategory({ variables: { categoryId: id, restaurant } })
              }
              style={{
                color: "white",
                justifySelf: "flex-start",
              }}
            />
          </div>

          <Input placeholder={name} name={name} onChange={onChange}></Input>
          {submited && (
            <SucceedMessage>Item Changed Successfuly</SucceedMessage>
          )}
          <Button type="submit">Save</Button>
        </form>
      </Modal>
    </div>
  );
}
