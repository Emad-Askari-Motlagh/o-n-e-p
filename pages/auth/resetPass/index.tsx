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

export default function ResetPass() {
  const [email, setEmail] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function formSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      usernameInput: { value: string };
    };
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
        <Input
          name="email"
          placeholder="Enter your email"
          type="text"
          width={"80%"}
          onChange={onChange}
        />
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
