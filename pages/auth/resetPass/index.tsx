import Button from "components/Button";
import Input from "components/Input";
import PrimaryLayout from "@/components/PrimaryLayout";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "./style.module.scss";
import { FiKey } from "react-icons/fi";
import { useRouter } from "next/router";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ApolloError, useMutation } from "@apollo/client";
import {
  SEND_RESET_PASSWORD,
  UPDATE_PASSWORD,
} from "@/server/graphql/querys/mutations.graphql";
import {
  SendResetPasswordMutation,
  SendResetPasswordMutationVariables,
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from "@/server/generated/graphql";
import Error from "components/ErrorCard";

export default function ResetPass() {
  const [email, setEmail] = useState<string>("");
  const [newPass, setPassword] = useState<string>("");
  const [WentThrough, setWentThrough] = useState<string>("");
  const [error, setError] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [updatePassword] = useMutation<
    UpdatePasswordMutation,
    UpdatePasswordMutationVariables
  >(UPDATE_PASSWORD, {
    onError: (err) => {
      err.graphQLErrors.map((re) => {
        console.log(re.extensions);
      });
    },
  });
  const [sendResetPass] = useMutation<
    SendResetPasswordMutation,
    SendResetPasswordMutationVariables
  >(SEND_RESET_PASSWORD, {
    onError: (err) => {
      setError("Couldnt reset password");
    },
    onCompleted: () => {
      setError("");
      setWentThrough("Message sent, check your mail box");
    },
  });
  const token = router.query.token as string | undefined;
  const uId = router.query.uId;
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    if (token) {
      setPassword(e.target.value);
    } else {
      setEmail(e.target.value);
    }
  }

  async function formSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };
    try {
      if (token) {
        // const formElements = form.elements as typeof form.elements & {
        //   password: { value: string };
        // };

        const pass = formElements.password.value;
        updatePassword({
          variables: { token, newPass: pass, userId: uId as string },
          onError: (err: ApolloError) => {
            setError(err.message);
          },
          onCompleted: () => {
            setError("");
            setWentThrough("Your password changed successfuly");
            setTimeout(() => {
              router.push("/auth/login");
            }, 1000);
          },
        });
      } else {
        const email = formElements.email.value;
        sendResetPass({
          variables: { email },
          onCompleted: (res) => {
            setWentThrough("Email sent, please check your emails");
            formElements.email.value = "";
          },
          onError: (err: ApolloError) => {
            console.log(err.cause, err.message, err.extraInfo, "erroorrr");
          },
        });
      }
    } catch (err: any) {
      console.log(err?.message);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.icon_parent}>
        <FiKey className={styles.icon} />
      </div>

      <h2>{`${token ? "Reset password" : "Forgot your password!"}`}</h2>
      <h3>
        {uId
          ? "Enter your new password"
          : "Don`t worry! Enter your email address and we send you a reset link"}
      </h3>

      <form ref={formRef} onSubmit={formSubmit}>
        {token ? (
          <Input
            name="password"
            placeholder="new password"
            type="password"
            width={"100%"}
            onChange={onChange}
          />
        ) : (
          <Input
            name="email"
            placeholder="Enter your email"
            type="text"
            width={"100%"}
            onChange={onChange}
          />
        )}
        {error && <Error>{error}</Error>}
        {WentThrough && <Error>{WentThrough}</Error>}

        <Button type="submit">{`${
          token ? "Change password" : "Send reset password link"
        }`}</Button>
      </form>
    </div>
  );
}

ResetPass.Layout = PrimaryLayout;

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req?.cookies?.token) {
    console.log(req.cookies.token);
  }

  return {
    props: {
      isSignedIn: false,
    },
  };
}
