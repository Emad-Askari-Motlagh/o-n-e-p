import style from "./styles.module.scss";
import CheckOutBar from "components/CheckOutBar";
import { useEffect, useRef, useState } from "react";
import Modal from "components/Modal";
import useOrders from "hooks/useOrder";
import SummaryItem from "components/SummaryItem";
import { useRouter } from "next/router";
import LinkButton from "components/LinkButton";

export default function Summary() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, removeOrder, addOrder, orders } = useOrders();
  if (!orders?.length) return null;
  return (
    <div className={style.checkout_container}>
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          label="Orders">
          {loading && (
            <div className={style.error_Parent}>
              <span style={{ color: "white" }}>Loading...</span>
            </div>
          )}
          {!orders?.length && !loading && (
            <div className={style.error_Parent}>
              <span style={{ color: "white" }}>OBS!</span>
              <span style={{ color: "white" }}>You have not any orders</span>
            </div>
          )}
          {Array.isArray(orders) &&
            router.query.name &&
            orders.map((res, i) => (
              <SummaryItem
                key={res?._id}
                id={res?.product._id}
                description={res?.product.description}
                name={res?.product?.name}
                ImageSrc={"/1.webp"}
                quantity={res?.orderQuantity}
                removeOrder={removeOrder}
                addOrder={addOrder}
                price={res?.product.price}
              />
            ))}{" "}
          <div className={style.button_parent}>
            <LinkButton
              href={`/restaurant/${router.query.name}/checkout/2345`}
              onClick={() => setIsModalOpen(false)}>
              Checkout
            </LinkButton>
          </div>
        </Modal>
      )}
      {router.query.name && !router.route.includes("/checkout") && (
        <CheckOutBar onClick={() => setIsModalOpen(!isModalOpen)}></CheckOutBar>
      )}
    </div>
  );
}
