import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import style from "./stripe.module.scss";
import { Alert } from "react-bootstrap";
import Button from "components/Button";
import { useRouter } from "next/router";
import SucceedMessage from "../Succeed-Message";
import { PayMutationFn } from "@/server/generated/graphql";
import Image from "next/image";
import { MdCreditCard } from "react-icons/md";
import AnimatedHeader from "../AnimatedHeader";
import ErrorCard from "../ErrorCard";

type StripeProps = {
  sum: number;
  quantity: number;
  orders: { _id: string }[];
  pay: PayMutationFn;
  redirectPath: string;
};
export default function Stripe({
  sum,
  quantity,
  orders,
  pay,
  redirectPath,
}: StripeProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    //Block native form submission.
    event.preventDefault();

    if (!stripe || !elements || !orders.length) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });
    if (error) {
      setError(error.message);
    } else {
      try {
        const { id } = paymentMethod;
        if (id) {
          setSuccess(true);
          pay({
            variables: {
              restaurant: router.query.name as string,
              products: orders?.map((res: { _id: string }) => res?._id),
              price: sum,
            },
            onCompleted: () => {
              setTimeout(() => {
                router.push(redirectPath);
              }, 2000);
            },
          });
        }
      } catch (err: any) {
        console.log("Error", err.message);
        setError(err.message);
      }
    }
  };

  return (
    <div className={style.container}>
      <div className={style.innerContainer}>
        <form onSubmit={handleSubmit} className={style.stripeForm}>
          <div className={style.price_container}>
            <label>{`Quantity:  ${quantity}`}</label>
            <span>{`Price:${sum}.00 kr`} </span>
          </div>
          <div className={style.stripe_info}>
            {" "}
            <Image
              alt="cards-images"
              src="/cards.webp"
              height={50}
              width={400}
              objectFit="contain"
              objectPosition="center"
              style={{ margin: "auto" }}
            />
            <AnimatedHeader Logo={<MdCreditCard />}>Card Info</AnimatedHeader>
            <CardElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </div>

          {error && <ErrorCard>{error}</ErrorCard>}
          {success && (
            <SucceedMessage>{`You paid ${sum} , kr successfuly`}</SucceedMessage>
          )}
          <div className={style.submit_button}>
            <Button type="submit">Pay</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  iconColor: "#c4f0ff",
  color: "#ff0",
  fontWeight: "500",
  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
  fontSize: "16px",
  fontSmoothing: "antialiased",
  ":-webkit-autofill": {
    color: "#fce883",
  },
  "::placeholder": {
    color: "#87BBFD",
  },
};
