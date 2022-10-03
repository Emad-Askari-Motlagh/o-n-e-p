import Button from "components/Button";
import Input from "components/Input";
import PrimaryLayout from "components/Primary-layout";
import e from "express";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  EventHandler,
  FormEvent,
  FormEventHandler,
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { FiKey } from "react-icons/fi";
import { useRouter } from "next/router";
import { useProvideAuth } from "hooks/Context.hook";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { ApolloError, useMutation } from "@apollo/client";
import {
  SEND_RESET_PASSWORD,
  UPDATE_PASSWORD,
} from "@/server/graphql/querys/mutations.graphql";
import {
  UpdatePasswordMutation,
  UpdatePasswordMutationVariables,
} from "@/server/generated/graphql";
import JWT, { JwtPayload } from "jsonwebtoken";
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
      console.log(err);
    },
  });
  const [sendResetPass] = useMutation(SEND_RESET_PASSWORD, {
    onError: (err) => {
      console.log(err);
    },
  });
  const token = router.query.token as string | undefined;
  const uId = router.query.uId as number | undefined;
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
          variables: { token, newPass: pass, userId: uId },
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

      <h2>Forgot your password!</h2>
      <h3>
        Don`t worry! Enter your email address and we send you a reset link
      </h3>

      <form
        ref={formRef}
        onSubmit={formSubmit}
        style={{ display: "flex", flexDirection: "column" }}>
        {token ? (
          <Input
            name="password"
            placeholder="Enter your new password"
            type="password"
            width={"80%"}
            onChange={onChange}
          />
        ) : (
          <Input
            name="email"
            placeholder="Enter your email"
            type="text"
            width={"80%"}
            onChange={onChange}
          />
        )}
        {error && <Error>{error}</Error>}
        {WentThrough && <Error>{WentThrough}</Error>}
        <Button width="50%" type="submit">
          Send the reset password link
        </Button>
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
