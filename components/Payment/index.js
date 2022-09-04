import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Button from "../Button";
import Modal from "../Modal";
import style from "./style.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "components/Stripe";
import useOrders from "hooks/useOrder";

export default function Payment({ isModalOpen, setIsModalOpen }) {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_KEY)
  );

  const { orders: data } = useOrders();
  const router = useRouter();
  function hasDuplicates(array) {
    return new Set(array).size !== array.length;
  }
  const cartLength =
    (data && data.reduce((acc, item) => acc + item.orderQuantity, 0)) || 0;

  const sum = data.reduce((acc, item) => {
    const quantity = item.orderQuantity;
    return (acc + item.product.price) * quantity;
  }, 0);

  return (
    <div className={style.checkout_perent}>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          label="Payment">
          <Elements stripe={stripePromise}>
            <CheckoutForm orders={data} sum={sum} quantity={cartLength} />
          </Elements>
        </Modal>
      )}

      <Button width={"80%"} onClick={() => setIsModalOpen(true)}>
        Pay now
      </Button>
    </div>
  );
}
