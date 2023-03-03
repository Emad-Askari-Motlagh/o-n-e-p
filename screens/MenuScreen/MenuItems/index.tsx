import MenuItem from "components/MenuItem";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/Order.hook";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Form from "components/MenuItem/Form";
import ChoisesCard from "components/MenuItem/ChoisesCard";
import Selection from "components/Selection";
import Button from "@/components/Button";
import Modal from "components/Modal";
import { CgMore } from "react-icons/cg";
import Input from "@/components/Input";
import { AddOrderMutationResult } from "@/server/generated/graphql";
interface MyTipes<P> {
  data: P;
}

export default function Items({
  items,
}: {
  items: MyTipes<AddOrderMutationResult>;
}) {
  const Router = useRouter();

  let [selectedItem, setSelectedItem] = useState("Pommes");
  let [selection, setSelection] = useState([]);
  const [exrasOrderModal, setExtraOrderModalOpen] = useState(false);
  let [costumerExtraChoises, setCostumerExtraChoises] = useState([]);
  const [description, setDescription] = useState("");
  const {
    orders,
    removeOrder,
    addOrder,
    loading: orderLoading,
    AdminOrders,
    addExtra,
  } = useOrders();

  const restaurant = Router.query?.name as string;

  function onEnterModal(
    item: { _id: string },
    items: { name: string; extra: {}[] }[]
  ) {
    if (!item) return;
    items.map((res) => {
      setSelection([...res.extra]);
    });
    setSelectedItem(items?.[0]?.name);
    const correctItem = orders
      .find((r) => r.product._id === item._id)
      ?.extra.filter((extra) => extra.quantity !== 0);
    if (correctItem) {
      setCostumerExtraChoises([...correctItem]);
    }
  }

  function onSelect(e) {
    if (!selection?.length) {
      return;
    }

    const { _id, name, price } = selection.find(
      (val) => val.name === e.target.value
    );

    setSelectedItem(name);
    const isMatch = !!costumerExtraChoises.find((extra) => extra.name === name);
    if (!isMatch) {
      setCostumerExtraChoises([
        ...costumerExtraChoises,
        {
          _id,
          name,
          price,
          quantity: 1,
        },
      ]);
    }
  }
  async function submit(res: { _id: string }) {
    try {
      await addExtra({
        variables: {
          description,
          id: orders.find((r) => r.product._id === res._id)._id,
          orderItem: costumerExtraChoises.map((r) => ({
            name: r.name,
            price: r.price,
            _id: r._id,
            quantity: r.quantity,
          })),
        },
        onCompleted: () => {
          setExtraOrderModalOpen(false);
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  function onAddQuantity(result: { _id: string; quantity: number }) {
    setCostumerExtraChoises([
      ...costumerExtraChoises.map((item) => {
        if (item._id === result._id) {
          return {
            ...item,

            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    ]);
  }
  function onDeleteQuantity(result: { _id: string; quantity: number }) {
    setCostumerExtraChoises([
      ...costumerExtraChoises.map((item) => {
        if (item._id === result._id) {
          return {
            ...item,

            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    ]);

    if (result.quantity < 1) {
      setCostumerExtraChoises([
        ...costumerExtraChoises.filter((r) => r._id === result._id),
      ]);
    }
    return selection;
  }

  //Function to Compute final quantity based on co§;stumers Orders
  function countQuantity(
    id: number,
    orders: [{ orderQuantity: number; product: { _id: number } }]
  ) {
    if (Array.isArray(orders) && id) {
      const result = orders.find((ress) => ress.product?._id === id);
      if (result) {
        return result.orderQuantity;
      } else {
        return 0;
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.items_container}>
        {Array.isArray(items) &&
          items.map((res, i) => (
            <div
              key={res?._id || i}
              style={{ margin: "auto", position: "relative" }}>
              <MenuItem
                id={res?._id}
                description={res?.description}
                name={res?.name}
                ImageSrc={res.images[0]}
                addOrder={() =>
                  addOrder({
                    variables: { productId: res._id },
                  })
                }
                removeOrder={() =>
                  removeOrder({
                    variables: { productId: res._id },
                  })
                }
                price={res.price}
                quantity={countQuantity(res._id, orders)}
              />

              <CgMore
                onClick={() => setExtraOrderModalOpen(true)}
                className={styles.more_icon}
              />
              <Modal
                isModalOpen={exrasOrderModal}
                setIsModalOpen={setExtraOrderModalOpen}
                label={"Extra"}
                onEnter={() => onEnterModal(res, items)}>
                <>
                  <form
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}>
                    {selection.length && (
                      <Selection
                        value={
                          [{ name: "Choose an extra item" }, ...selection][0]
                            .name
                        }
                        onChange={onSelect}
                        label={"Choose an extra item"}
                        options={[
                          { name: "Choose an extra item" },
                          ...selection,
                        ]}
                      />
                    )}
                    <Input
                      width="100%"
                      minRows={4}
                      multiline
                      placeholder="Extra description"
                      onChange={(e) => setDescription(e.target.value)}></Input>
                  </form>
                  {costumerExtraChoises?.length &&
                    costumerExtraChoises.map((result, i) => (
                      <ChoisesCard
                        key={i}
                        setSelection={setCostumerExtraChoises}
                        selection={result}
                        costumerExtra={res.value}>
                        <span
                          style={{ color: "wheat" }}
                          className={styles.signs}
                          onClick={() => {
                            onAddQuantity(result);
                          }}>
                          +
                        </span>
                        <span
                          className={styles.signs}
                          style={{ color: "wheat" }}
                          onClick={() => onDeleteQuantity(result)}>
                          -
                        </span>
                      </ChoisesCard>
                    ))}
                  {orders?.length &&
                    !!orders.find((r) => r.product._id === res._id) && (
                      <Button
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          submit(res);
                        }}>
                        Submit
                      </Button>
                    )}
                </>
              </Modal>
            </div>
          ))}
      </div>
    </div>
  );
}

Items.Layout = PrimaryLayout;
