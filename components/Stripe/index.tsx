import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import style from "./stripe.module.scss";
import { Alert } from "react-bootstrap";
import Button from "components/Button";
import { useRouter } from "next/router";
import SucceedMessage from "../Succeed-Message";
import { PayMutationFn } from "@/server/generated/graphql";
type StripeProps = {
  sum: number;
  quantity: number;
  orders: { _id: string }[];
  pay: PayMutationFn;
};
export default function Stripe({ sum, quantity, orders, pay }: StripeProps) {
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
        console.log("payment id", id);
        if (id) {
          setSuccess(true);

          pay({
            variables: {
              restaurant: router.query.name as string,
              products: orders?.map((res: { _id: string }) => res?._id),
              price: sum,
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
          <div style={{ marginBottom: "4%" }}>
            <motion.label
              className={style.card_label}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              layoutId="title">
              Card specifications
            </motion.label>
            <CardElement
              options={{
                style: {
                  base: inputStyle,
                },
              }}
            />
          </div>
          {error && <Alert variant="danger">{error}</Alert>}
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
