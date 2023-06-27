import React, { useState } from "react";
import Link from "next/link";
import styles from "./auth.module.scss";
import { motion } from "framer-motion";
import * as yup from "yup";
import { Alert } from "react-bootstrap";
import { useFormik } from "formik";
import { useUser } from "hooks/Context.hook";
import PrimaryLayout from "@/components/PrimaryLayout";
import Button from "components/Button";
import Input from "components/Input";
import LoginSucceed from "components/Succeed-Message";
import { useRouter } from "next/router";
import Info from "@/components/Info";
import Head from "next/head";
import AnimatedHeader from "@/components/AnimatedHeader";

export default function Login() {
  const [error, setError] = useState<string | null>("");
  const [loginSuccesed, setLoginSuccesed] = useState(false);
  const { signIn, signInError } = useUser();
  const Router = useRouter();

  const { handleChange, handleSubmit, values, touched, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter email"),
      password: yup.string().required("Please enter password"),
    }),
    validateOnMount: true,

    async onSubmit(values, { resetForm, setErrors }) {
      setError("");
      try {
        const token = await signIn({
          email: values.email,
          password: values.password,
        });
        if (token) {
          setLoginSuccesed(true);
          setTimeout(() => {
            Router.push(`/admin`);
          }, 1000);
          setError("");
        } else {
          throw new Error("Invalid login");
        }
        resetForm();
      } catch (err) {
        setError("Error on login");
        console.log(err);
      }
    },

    enableReinitialize: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.login_container}>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <AnimatedHeader>Login</AnimatedHeader>
      <AnimatedHeader fontSize="14px">
        Welcome back, nice to have you here{" "}
      </AnimatedHeader>
      <Info>
        For testing one of restaurant`s feautures, you can use email:
        emad.askari@gmail.com & password: emadi
      </Info>
      <form onSubmit={handleSubmit} onFocus={() => setError(null)}>
        <div className={styles.input_container} onFocus={() => setError(null)}>
          <Input
            name="email"
            placeholder="email"
            type="text"
            onChange={handleChange}
            label="Email"
            value={values.email}
          />
          {touched.email && errors.email ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.email}
            </Alert>
          ) : null}
        </div>
        <div className={styles.input_container}>
          <Input
            name="password"
            placeholder="password"
            type="password"
            onChange={handleChange}
            label="Password"
            value={values.password}
          />
          {touched.password && errors.password ? (
            <Alert style={{ padding: 0 }} variant="danger" className="error">
              {errors.password}
            </Alert>
          ) : null}
        </div>

        <Button type="submit" width={"50%"}>
          Login
        </Button>
        {loginSuccesed && <LoginSucceed>Login Succeed</LoginSucceed>}
        {signInError && (
          <Alert variant="danger" className={styles.error_message}>
            {signInError}
          </Alert>
        )}
      </form>
      <div className={styles.forgotPassword_div}>
        <Link href="/auth/resetPass">
          <a>Do you forgot your password?</a>
        </Link>
      </div>
    </motion.div>
  );
}

Login.Layout = PrimaryLayout;
