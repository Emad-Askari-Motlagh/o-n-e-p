import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./auth.module.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Header_animations from "components/framer_helpers/Header_animations";
import * as yup from "yup";
import { Alert } from "react-bootstrap";
import { useFormik, ErrorMessage } from "formik";
import { useUser } from "hooks/Context.hook";
import PrimaryLayout from "components/Primary-layout";
import Button from "components/Button";
import Input from "components/Input";
import LoginSucceed from "components/Succeed-Message";
import { signIn as signInWithGoogle } from "next-auth/react";
import { useRouter } from "next/router";
import Info from "@/components/Info";
import Head from "next/head";

export default function Login() {
  const [error, setError] = useState<string | null>("");
  const [loginSuccesed, setLoginSuccesed] = useState(false);
  const { signIn, signOut, user, signInError } = useUser();
  const Router = useRouter();

  const onSuccess = async () => {
    try {
      await signInWithGoogle("google", {
        ...values,
        redirect: false,
      });
    } catch (err) {
      setError(signInError);
    }
  };
  const {
    handleChange,
    handleSubmit,
    values,
    touched,
    errors,
    setErrors,
    handleBlur,
  } = useFormik({
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
      {" "}
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
      </Head>
      <Header_animations text=" Login" />
      <Header_animations
        text="Welcome back, nice to have you here "
        style={{ color: "white", fontSize: "12px" }}
      />
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
      {/*--------this part is for the situation that user can register--------------------*/}
      {/* <div className={styles.login_alternatives_container}>
        <div onClick={onSuccess} className={styles.auth_buttons}>
          <FaGoogle className={styles.icons}></FaGoogle>
          <span> Signin with Google</span>
        </div>
      </div> */}
      {/* <Link href="/auth/signup">
        <a className={styles.account_recomendation}>
          Dont you have an account?
          <h3>Register now</h3>
        </a>
      </Link> */}
    </motion.div>
  );
}

Login.Layout = PrimaryLayout;
