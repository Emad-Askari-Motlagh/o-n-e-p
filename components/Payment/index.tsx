import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Modal from "../Modal";
import style from "./style.module.scss";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "components/Stripe";
import Addresses from "screens/adressScreen";
import ErrorCard from "../ErrorCard";
import { PayMutationFn } from "@/server/generated/graphql";
import Info from "../Info";

type PaymentProps = {
  isModalOpen: boolean;
  setIsModalOpen: (arg: boolean) => void;
  orders: any;
  address: [];
  pay: PayMutationFn;
  sum: number;
  paymentError: boolean;
};
export default function Payment({
  isModalOpen,
  setIsModalOpen,
  orders: data,
  address,
  pay,
  sum,
  paymentError,
}: PaymentProps) {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_KEY)
  );

  const router = useRouter();

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
            <Addresses data={address} />
            <Info>
              OBS! for payment use: Card number:4242424242424242 Expire
              date:1234 ccv:567 Zip:12345
            </Info>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                orders={data}
                sum={sum}
                quantity={cartLength}
                pay={pay}
                redirectPath={`/restaurant/${router.query?.name}/menu`}
              />
            </Elements>
            {paymentError && (
              <ErrorCard>OBS! Payment didn`t go throw</ErrorCard>
            )}
          </div>
        </Modal>
      )}

      <Button width={"80%"} onClick={() => setIsModalOpen(true)}>
        Pay now
      </Button>
    </div>
  );
}
