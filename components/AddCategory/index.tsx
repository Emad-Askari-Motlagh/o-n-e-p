import useUpload from "hooks/upload.hook";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "../Button";
import FileInput from "../Image-Input";
import Input from "../Input";
import SucceedMessage from "../Succeed-Message";
import styles from "./styles.module.scss";

interface AddCategoryProps {
  restaurant?: string;
  submit: any;
  isAdded?: boolean;
  parent?: string;
}
export default function AddCategory({
  restaurant,
  submit,
  isAdded,
  parent,
}: AddCategoryProps) {
  const [fileImage, setFileImage] = useState<Blob | string>();
  const [name, setName] = useState<string>();
  const { uploadImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      uploadImage(e), setFileImage(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        alt="ok"
        width={100}
        height={100}
        src={image ?? "/blur_image.webp"}></Image>
      <form>
        <Input
          label="Name"
          placeholder="Category`s name"
          onChange={(e) => setName(e.target.value)}
        />

        <FileInput label="Upload Image" onChange={onChangeImage} />
        <Button
          type="submit"
          width="80%"
          onClick={(e) => {
            e.preventDefault();

            if (image) {
              submit({
                variables: {
                  name,
                  image: image,
                  parent,
                  restaurant,
                },
              });
            }
          }}>
          Add new category
        </Button>

        {isAdded && <SucceedMessage>Category Added</SucceedMessage>}
      </form>
    </div>
  );
}
