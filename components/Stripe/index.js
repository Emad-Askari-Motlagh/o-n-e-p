import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import style from "./stripe.module.scss";
import { Alert } from "react-bootstrap";
import Button from "components/Button";
import Addresses from "screens/adressScreen";

export default function Stripe({ amount, sum, quantity }) {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    // Block native form submission.
    // event.preventDefault();
    // if (!stripe || !elements) {
    //   return;
    // }
    // const cardElement = elements.getElement(CardElement);
    // // Use your card Element with other Stripe.js APIs
    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    //   type: "card",
    //   card: cardElement,
    // });
    // if (error) {
    //   console.log("[error]", error);
    //   setError(error.message);
    // } else {
    //   try {
    //     const { id } = paymentMethod;
    //   } catch (err) {
    //     console.log("Error", err.message);
    //     setError(err.message);
    //   }
    // }
  };

  return (
    <div className={style.container}>
      {/* <div className={style.innerContainer}>
        <form onSubmit={handleSubmit} className={style.stripeForm}>
          {true && (
            <div className={style.price_container}>
              <label>{`Quantity:  ${quantity}`}</label>

              <span>{`Price:   ${sum}.00 kr`} </span>
            </div>
          )}
          {false && <Addresses />}
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

          <div className={style.submit_button}>
            <Button type="submit">Pay</Button>
          </div>
        </form>
        {error && <Alert variant="danger">{error}</Alert>}
      </div> */}
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
