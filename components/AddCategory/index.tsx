import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import FileInput from "../Image-Input";
import Input from "../Input";
import SucceedMessage from "../Succeed-Message";
import styles from "./styles.module.scss";

export default function AddCategory({
  restaurant,
  submit,
  onChangeImage,
  fetchedImage,
  isAdded,
  parent,
}) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  return (
    <div>
      <div className={styles.res_name_container}>
        <span>Restaurant: </span> <span>{restaurant.name}</span>
      </div>
      <Input
        label="Name"
        placeholder="Category`s name"
        onChange={(e) => setName(e.target.value)}
      />
      {image && (
        <Image
          alt="ok"
          width={100}
          height={100}
          src={fetchedImage ? fetchedImage.url : image}></Image>
      )}
      <FileInput
        label="Upload Image"
        onChange={(e) => {
          if (e.target.files)
            onChangeImage(e), setImage(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <Button
        onClick={() =>
          name &&
          fetchedImage &&
          submit({
            variables: {
              name,
              image: fetchedImage.url,
              parent,
              restaurant,
            },
          })
        }>
        Add new category
      </Button>
      {isAdded && <SucceedMessage>Category Added</SucceedMessage>}
    </div>
  );
}
