import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import styles from "./address-card.module.scss";
import Button from "../Button";
import Input from "../Input";

interface UpdateAddressProps {
  addressData: {
    address: string;
    city: string;
    postNumber: string;
    region: string;
    title: string;
  };
  closeEvent: () => void;
}

export default function UpdateAddress({
  addressData,
  closeEvent,
}: UpdateAddressProps) {
  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      title: "",
      city: "",
      region: "",
      zipcode: "",
      full_address: "",
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .required("* Title is required.")
        .min(2, "* Title is too short"),
      city: yup
        .string()
        .required("* City is required.")
        .min(2, "* City is too short"),
      region: yup.string().required("* Region is required."),
      zipcode: yup.string().required("* Zip Code is required."),
      full_address: yup.string().required("* Address Line is required."),
    }),
    onSubmit: (values) => {},
  });

  const closeModal = (target: HTMLElement | null) => {
    target?.id === "container" && closeEvent();
  };

  return (
    <div
      className={styles.update_container}
      id="container"
      onClick={(e) => closeModal(e.target as HTMLElement)}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h4>Update your Address</h4>
          <div onClick={closeEvent}>×</div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputContainer}>
            <Input
              name="title"
              value={values.title}
              placeholder="Home, Office, etc."
              error={errors.title}
              onChange={handleChange}
              label="Address Title"
            />
          </div>
          {touched.title && errors.title ? (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors.title}
            </span>
          ) : null}

          <div className={styles.inputContainer}>
            <Input
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="New York, London, etc."
              error={errors.city}
              label="City"
            />
          </div>
          {touched.city && errors.city && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.city}
            </span>
          )}

          <div className={styles.inputContainer}>
            <Input
              name="region"
              placeholder="France, Italy, etc."
              error={errors?.region}
              value={values.region}
              onChange={handleChange}
              label="Region"
            />
          </div>
          {errors.region && touched.region && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.region}
            </span>
          )}

          <div className={styles.inputContainer}>
            <Input
              value={values.zipcode}
              onChange={handleChange}
              name="zipcode"
              placeholder=""
              error={errors?.zipcode}
              label="Zip Code"
              width="100%"
            />
          </div>
          {errors.zipcode && touched.zipcode && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.zipcode}
            </span>
          )}

          <div className={styles.inputContainer}>
            <Input
              name="full_address"
              placeholder="123 Main Street, New York, NY 10030, etc."
              error={errors.full_address}
              value={values.full_address}
              onChange={handleChange}
              label="Address Line"
            />
          </div>
          {errors.full_address && touched.full_address && (
            <span style={{ color: "red", marginTop: 4, fontSize: 14 }}>
              {errors?.full_address}
            </span>
          )}
          <Button type="submit" style={{ marginBottom: 0 }}>
            Update Address
          </Button>
        </form>
      </div>
    </div>
  );
}
