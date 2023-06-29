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
      table: yup.number().required("You need a table number to continue!"),
    }),
    validateOnMount: true,
    onSubmit(values, { setErrors }) {
      onSubmit({
        name: values.name,
        table: values.table,
        email: values.email,
      });
    },
    enableReinitialize: true,
  });

  return (
    <div className={`${styles.costumerRegContainer} ${"fix_height"}`}>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            placeholder="Table"
            name="table"
            label={"Tables number"}
            type="number"
            onChange={handleChange}
            id="Tables number"
          />

          {touched.table && errors.table ? (
            <Alert
              style={{ padding: "5px 20px" }}
              variant="danger"
              className="error">
              {errors.table}
            </Alert>
          ) : null}
        </div>

        <Input
          placeholder="Name"
          name="name"
          label={"Costumer`s name"}
          type="text"
          onChange={handleChange}
          id="costumer"
        />
        {errors.name && touched.name ? (
          <Alert
            style={{ padding: "5px 20px" }}
            variant="danger"
            className="error">
            {errors.name}
          </Alert>
        ) : null}

        <Input
          placeholder="Email"
          name="email"
          label={"Costumer`s email"}
          type="email"
          onChange={handleChange}
          id="email"
        />
        {errors.email && touched.email ? (
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
