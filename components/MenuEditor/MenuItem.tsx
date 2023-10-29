import React, { ChangeEvent, useState } from "react";
import Input from "../Input";
import Button from "components/Button";
import styles from "./styles.module.scss";
import FileInput from "../FileInput";
import useUpload from "hooks/Upload.hook";
import Image from "next/image";
import SucceedMessage from "../Succeed-Message";
import { UpdateMenuItemsMutationFn } from "@/server/generated/graphql";

interface InputsTypes {
  data: any;
  submit: UpdateMenuItemsMutationFn;
  restaurant: string;
  category: string;
  subCat: string[];
}
export default function MenuItem({
  data,
  submit,
  restaurant,
  category,
  subCat: fetchedSubCat,
}: InputsTypes) {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [file, setFile] = useState();
  const [subCat, setSubCat] = useState("");
  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );
  const [submited, setIsSubmited] = useState(false);
  const [newName, setNewName] = useState<File>();
  function Submit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    submit({
      variables: {
        productId: data?._id,
        restaurant,
        category,
        input: {
          name: name ? name : data.name,
          description: description ? description : data.description,
          price: price ? price : data.price,
          images: [image as string] ?? data?.images[0],
        },
      },
      onCompleted: () => {
        setIsSubmited(true);
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
        src={newName ? URL.createObjectURL(newName) : data?.images[0]}></Image>
      <form style={{ display: "flex", flexDirection: "column" }}>
        <FileInput
          label="Upload Image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) {
              uploadImage(e), setNewName(e.target.files[0]);
            }
          }}
        />
        <Input
          placeholder="Item`s name"
          label={"Name"}
          type="text"
          defaultValue={data.name}
          value={data.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={"Price"}
          type="number"
          label={"Price"}
          value={`${data.price} . 00`}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Input
          placeholder="Description"
          label={"Description"}
          type="text"
          defaultValue={data.description}
          onChange={(e) => setDescription(e.target.value)}
          multiline={true}
          minRows={4}
        />
        <Input
          placeholder="Category"
          label={"Add to category"}
          type="text"
          value={data.subCat[subCat.length - 1]}
          onChange={(e) => setSubCat(e.target.value)}
        />
        {submited && <SucceedMessage>Item Changed Successfuly</SucceedMessage>}
        <Button width="80%" onClick={Submit as () => void}>
          Save
        </Button>
      </form>
    </div>
  );
}
