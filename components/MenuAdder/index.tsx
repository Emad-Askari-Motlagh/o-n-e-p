import React, {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import Input from "../Input";
import Button from "components/Button";
import styles from "./styles.module.scss";
import FileInput from "../Image-Input";
import useUpload from "hooks/upload.hook";
import Image from "next/image";
import SucceedMessage from "../Succeed-Message";
import { AddMenuItemMutationFn } from "@/server/generated/graphql";

interface InputsTypes {
  submit: AddMenuItemMutationFn;
  restaurant: string;
  category: string;
  subCat?: string | string[];
}
export default function MenuAdder({
  submit,
  restaurant,
  category,
  subCat,
}: InputsTypes) {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [subCategory, setSubCategory] = useState("");
  const [file, setFile] = useState();
  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );

  const [newName, setNewName] = useState<File>();
  function Submit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    submit({
      variables: {
        restaurant,
        category,
        input: {
          images: [image as string],
          name,
          description,
          price,
        },
        subCat: subCategory ?? subCat,
      },
    });
  }

  return (
    <div className={styles.input_container}>
      <Image
        className={styles.image}
        alt="ok"
        width={100}
        height={100}
        src={image ?? "/blur_image.webp"}></Image>
      <form>
        <FileInput
          label="Upload Image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0] && !newName) {
              uploadImage(e), setNewName(e.target.files[0]);
            }
          }}
        />
        <Input
          placeholder={"Item`s name"}
          label={"Name"}
          type="text"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={`Price`}
          type="number"
          label={"Price"}
          defaultValue={`${price} . 00`}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Input
          placeholder={"Description"}
          label={"Description"}
          type="text"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder={"SubCategory"}
          label={"Sub Category"}
          type="text"
          defaultValue={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
        />

        <Button width="80%" onClick={Submit as () => void}>
          Add menu item
        </Button>
      </form>
    </div>
  );
}
