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

interface InputsTypes {
  submit: () => void;
  restaurant: string;
  category: string;
}
export default function MenuAdder({
  submit,
  restaurant,
  category,
}: InputsTypes) {
  const [name, setName] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [file, setFile] = useState();
  const { uploadImage, setImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );
  const [submited, setIsSubmited] = useState(false);
  const [newName, setNewName] = useState<File>();
  function Submit(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    submit({
      variables: {
        restaurant,
        category,
        input: {
          images: [image.url],
          name,
          description,
          price,
        },
      },
    });
  }

  return (
    <div className={styles.input_container}>
      <form>
        <Image
          className={styles.image}
          alt="ok"
          width={100}
          height={100}
          src={
            newName ? URL.createObjectURL(newName) : "/blur_image.webp"
          }></Image>

        <FileInput
          label="Upload Image"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files?.[0]) {
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

        <Button onClick={Submit as () => void}>Save</Button>
      </form>
    </div>
  );
}
