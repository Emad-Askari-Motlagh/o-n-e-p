import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./auth.module.scss";
import { IoIosArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import Header_animations from "components/framer_helpers/Header_animations";
import * as yup from "yup";
import { Alert } from "react-bootstrap";
import { useFormik, ErrorMessage } from "formik";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import { useAuth, useProvideAuth } from "hooks/Context.hook";
import PrimaryLayout from "components/Primary-layout";
import Button from "components/Button";
import Input from "components/Input";
import { FaFacebook } from "react-icons/fa";
import LoginSucceed from "components/Succeed-Message";

export default function Login() {
  const [error, setError] = useState<string | null>();

  const [loginSuccesed, setLoginSuccesed] = useState(false);
  const { signIn, signOut, user, SigninWithGoogle, signInError } =
    useProvideAuth();
  const { handleChange, handleSubmit, values, touched, errors, setErrors } =
    useFormik({
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
      async onSubmit(values, { resetForm, setErrors }) {
        try {
          const token = await signIn({
            email: values.email,
            password: values.password,
          });
          if (token) {
            setLoginSuccesed(true);
            setTimeout(() => {
              globalThis.location.href = `/admin/${user.data?.CurrentUser?.restaurant.name}`;
            }, 1500);
          } else {
            setError(signInError);
          }
        } catch (err) {
          setError("Error on login");

          console.log(err);
        } finally {
          resetForm();
        }
      },

      enableReinitialize: true,
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.login_container}>
      <Header_animations text=" Login " style={{ color: "white" }} />
      <Header_animations
        text="Welcome back, nice to have you here "
        style={{ color: "white", fontSize: "12px" }}
      />
      <form onSubmit={handleSubmit} onFocus={() => setError(null)}>
        <div className={styles.input_container} onFocus={() => setError(null)}>
          <Input
            name="email"
            placeholder="email"
            type="text"
            onChange={handleChange}
            label="Email"
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
        {error && (
          <Alert variant="danger" className={styles.error_message}>
            {error}
          </Alert>
        )}
      </form>

      <div className={styles.forgotPassword_div}>
        <Link href="/auth/resetPass">
          <a>Do you forgot your password?</a>
        </Link>
      </div>
      <div className={styles.login_alternatives_container}>
        <div className={styles.auth_buttons} onClick={() => SigninWithGoogle()}>
          <ImFacebook2 style={{ marginRight: "4%" }} color="blue"></ImFacebook2>
          <span>Signup With Facebook</span>
        </div>

        <div onClick={() => SigninWithGoogle()} className={styles.auth_buttons}>
          <FaFacebook className={styles.icons} icon="google"></FaFacebook>
          <span> Signin with Google</span>
        </div>
      </div>

      <Link href="/auth/signup">
        <a className={styles.account_recomendation}>
          Dont you have an account?
          <h3>Register now</h3>
        </a>
      </Link>
    </motion.div>
  );
}

Login.Layout = PrimaryLayout;
