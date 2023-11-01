import React, {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Modal from "components/Modal";
import SucceedMessage from "../Succeed-Message";
import Image from "next/image";
import styles from "./styles.module.scss";
import FileInput from "@/components/FileInput";
import Input from "components/Input";
import Button from "../Button";
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
import MenuSubItem from "@/components/RestaurantParentCard";

interface CategoryProps {
  name: string;
  image: string;
  submit: FormEventHandler<HTMLFormElement>;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  submited: boolean;
  deleteCategory?: () => void;
  id?: string;
  restaurant: string;
  subCats: string[];
  addSubCategory?: () => void;
}
export default function CategoryEditor({
  name,
  image,
  submit,
  onChange,
  onChangeImage,
  submited,
  deleteCategory,
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
        image={image}
      ></MenuSubItem>

      <Modal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        label="Category Editor"
      >
        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          onSubmit={submit}
        >
          <div
            className={styles.image}
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {image && (
              <Image
                style={{
                  color: "white",
                }}
                alt="ok"
                width={100}
                height={100}
                src={image}
              ></Image>
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
              onClick={deleteCategory}
              className="icons"
              style={{
                color: "white",
                justifySelf: "flex-start",
                cursor: "pointer",
              }}
            />
          </div>
          <Input
            placeholder={"Category`s name"}
            name={name}
            onChange={onChange}
          ></Input>
          {submited && (
            <SucceedMessage>Item Changed Successfuly</SucceedMessage>
          )}
          <Button width="80%" type="submit">
            Save
          </Button>
        </form>
      </Modal>
    </div>
  );
}
