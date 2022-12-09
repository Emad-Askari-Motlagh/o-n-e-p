import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Button from "../Button";
import Modal from "../Modal";
import style from "./style.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "components/Stripe";
import Addresses from "screens/adressScreen";

export default function Payment({
  isModalOpen,
  setIsModalOpen,
  orders: data,
  address,
  pay,
  sum,
}) {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_KEY)
  );

  const router = useRouter();
  function hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
  const cartLength =
    (Array.isArray(data) &&
      data.reduce((acc, item) => acc + item.orderQuantity, 0)) ||
    0;

  return (
    <div className={style.checkout_perent}>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          label="Payment">
          <div style={{ color: "white" }}>
            <Addresses mydata={address} />
            <Elements stripe={stripePromise}>
              <CheckoutForm
                orders={data}
                sum={sum}
                quantity={cartLength}
                pay={pay}
              />
            </Elements>
          </div>
        </Modal>
      )}

      <Button width={"80%"} onClick={() => setIsModalOpen(true)}>
        Pay now
      </Button>
    </div>
  );
}
