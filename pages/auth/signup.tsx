import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./auth.module.scss";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";
import { Alert } from "react-bootstrap";
import { useFormik, ErrorMessage } from "formik";
import Header_animations from "@/components/FramerHelper/Header_animations";
import useAuth from "hooks/Auth.hook";
import Input from "components/Input";
import PrimaryLayout from "@/components/PrimaryLayout";
import Button from "components/Button";
import LoginSucceed from "components/Succeed-Message";

export default function Signup() {
  const [error, setError] = useState(null);
  const { signUp } = useAuth();
  const [loginSuccesed, setLoginSuccesed] = useState(false);

  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter email"),
      username: yup.string().required("Please choose a usernaame"),
      password: yup.string().required("Please enter password"),
    }),
    async onSubmit(values) {
      try {
        const token = await signUp({
          email: values.email,
          password: values.password,
          username: values.username,
        });
        if (token) {
          setLoginSuccesed(true);
          setTimeout(() => {
            globalThis.location.href = "/";
          }, 2000);
        }
      } catch (err) {
        console.log(err);
      }
    },
  });
  async function signUpGoogle() {
    return null;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.signup_parent}>
      <Header_animations
        text="Registration Form"
        style={{ color: "white", textAlign: "center" }}
      />

      <form onSubmit={handleSubmit} onFocus={() => setError(null)}>
        <div className={styles.input_container} onFocus={() => setError(null)}>
          <Input
            name="email"
            placeholder="Enter your Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            width={"80%"}
            label={"Email"}
          />
          {touched.email && errors.email ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.email}
            </Alert>
          ) : null}
        </div>
        <div className={styles.input_container}>
          <Input
            name="username"
            placeholder="Enter your Username"
            type="text"
            onChange={handleChange}
            width={"80%"}
            label={"Username"}
          />
          {touched.username && errors.username ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.username}
            </Alert>
          ) : null}
        </div>

        <div className={styles.input_container}>
          <Input
            name="password"
            placeholder="Enter your Password"
            type="password"
            onChange={handleChange}
            width={"80%"}
            label={"Password"}
          />
          {touched.password && errors.password ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.password}
            </Alert>
          ) : null}
        </div>
        <div className={styles.input_container}>
          <Input
            name="password"
            placeholder="Repeat your Password"
            type="password"
            onChange={handleChange}
            width={"80%"}
            label={"Re Password"}
          />
          {touched.password && errors.password ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.password}
            </Alert>
          ) : null}
        </div>
        <Button width={"60%"} type="submit">
          Submit
        </Button>
        {loginSuccesed && (
          <LoginSucceed>Thanks, You are registered now</LoginSucceed>
        )}
      </form>

      <div className={styles.forgotPassword_div}>
        <div> Do you already have an account?</div>
        <Link href="/auth/login">
          <a className={styles.account_recomendation}>Go to login</a>
        </Link>
      </div>
      <div className={styles.login_alternatives_container}>
        <span onClick={signUpGoogle} className={styles.auth_buttons}>
          <FcGoogle style={{ marginRight: "4%" }}></FcGoogle>
          <span>Signup With Google</span>
        </span>
      </div>
      {error && (
        <Alert variant="danger" className={styles.error_message}>
          {error}
        </Alert>
      )}
    </motion.div>
  );
}

Signup.Layout = PrimaryLayout;
