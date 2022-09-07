import React, { useEffect, useState } from "react";
import Input from "../Input";
import Button from "components/Button";
import styles from "./styles.module.scss";

export default function Inputs({ data, submit, restaurant, category }) {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

  function Submit(e) {
    e.preventDefault();
    submit({
      variables: {
        restaurant,
        category,
        input: {
          name: name ? name : data.name,
          description: description ? description : data.description,
          price: price ? price : data.price,
        },
      },
    });
  }

  return (
    <div className={styles.input_container}>
      <form>
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
        <Button onClick={Submit}>Save</Button>
      </form>
    </div>
  );
}
