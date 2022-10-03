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

export default function Inputs({ data, submit, restaurant, category }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();
  const { uploadImage, setImage, image } = useUpload(
    "https://api.cloudinary.com/v1_1/dug3htihd/image/upload"
  );
  const [submited, setIsSubmited] = useState(false);

  function Submit(e: ChangeEvent<HTMLInputElement>) {
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
          images: image?.url,
        },
      },
      onCompleted: () => {
        setIsSubmited(true);
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
          src={data?.images[0]}></Image>
        <FileInput label="Upload Image" onSubmit={uploadImage} />
        <Input
          placeholder={data.name}
          label={"Name"}
          type="text"
          defaultValue={data.name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder={`${data.price}.00 kr`}
          type="number"
          label={"Price"}
          defaultValue={`${data.price} . 00`}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
        />
        <Input
          placeholder={data.description}
          label={"Description"}
          type="text"
          defaultValue={data.description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className={styles.image_selector} htmlFor="image-input">
          Select a image
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          placeholder={"name"}
          label={"Image"}
          id="image-input"
          onChange={(res) => setFile(res.target.value)}
        />
        {submited && <SucceedMessage>Item Changed Successfuly</SucceedMessage>}
        <Button onClick={Submit}>Save</Button>
      </form>
    </div>
  );
}
