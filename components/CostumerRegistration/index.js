import React from "react";
import Input from "components/Input";
import styles from "./styles.module.scss";
import Button from "components/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { Alert } from "react-bootstrap";

export default function CostumerRegister({ onSubmit }) {
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      email: "",
      name: "",
      table: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter email"),
      name: yup.string().required("Please choose a name"),
      table: yup.number().required("You need a table name to continue!"),
    }),
    async onSubmit(values) {
      onSubmit({ name: values.name, table: values.table, email: values.email });
      console.log(values);
    },
  });

  return (
    <div className={`${styles.container} ${"fix_height"}`}>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Table"
          name={"table"}
          label={"Tables number"}
          type="number"
          onChange={handleChange}
          width={"80%"}
        />

        {touched.table && errors.table ? (
          <Alert
            style={{ padding: "5px 20px" }}
            variant="danger"
            className="error">
            {errors.table}
          </Alert>
        ) : null}
        <Input
          placeholder="Name"
          name={"name"}
          label={"Costumer`s name"}
          type="text"
          onChange={handleChange}
          width={"80%"}
        />
        {touched.name && errors.name ? (
          <Alert
            style={{ padding: "5px 20px" }}
            variant="danger"
            className="error">
            {errors.name}
          </Alert>
        ) : null}
        <Input
          placeholder="Email"
          name={"email"}
          label={"Costumer`s email"}
          type="email"
          onChange={handleChange}
          width={"80%"}
        />
        {touched.email && errors.email ? (
          <Alert
            style={{ padding: "5px 20px" }}
            variant="danger"
            className="error">
            {errors.email}
          </Alert>
        ) : null}
        <Button type="submit" width={"80%"}>
          Register
        </Button>
      </form>
    </div>
  );
}
