import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MenuItem from "components/MenuItem";
import PrimaryLayout from "@/components/PrimaryLayout";
import useOrders from "hooks/Order.hook";
import ChoisesCard from "components/MenuItem/ChoisesCard";
import Selection from "components/Selection";
import Button from "@/components/Button";
import Modal from "components/Modal";
import { CgMore } from "react-icons/cg";
import Input from "@/components/Input";
import { MenuItemByCategoryQuery } from "@/server/generated/graphql";
import styles from "./styles.module.scss";
import ErrorCard from "@/components/ErrorCard";
import { ExtendedQuery } from "types";
import { I_MenuItemDocument } from "@/server/mongoSchema/MenuItemSchema";
import { SelectChangeEvent } from "@mui/material";

interface MenuItemExtra {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Items({ items }: { items: MenuItemByCategoryQuery }) {
  const { query: rawQery } = useRouter();
  const query = rawQery as ExtendedQuery;
  const [selectedItem, setSelectedItem] = useState<string>("Pommes");
  const [selection, setSelection] = useState<I_MenuItemDocument[]>([]);
  const [exrasOrderModal, setExtraOrderModalOpen] = useState(false);
  const [costumerExtraChoises, setCostumerExtraChoises] = useState<
    MenuItemExtra[]
  >([]);
  const [ErrorOnSubmit, setError] = useState("");
  const [ErrorOnAddExtra, setErrorOnAddExtra] = useState("");
  const [description, setDescription] = useState<string>("");
  const {
    orders,
    removeOrder,
    addOrder,
    loading: orderLoading,
    addExtra,
  } = useOrders();

  function isMenuItem(obj: any): obj is I_MenuItemDocument {
    return obj.__typename === "MenuItem" && typeof obj.name === "string";
  }
  function isOrderItem(
    obj: any
  ): obj is { __typename: "OrderItem"; orderQuantity?: number | null } {
    return obj.__typename === "OrderItem";
  }

  useEffect(() => {
    if (items.MenuItemByCategory?.length) {
      const selected = items.MenuItemByCategory.find((item) => {
        return isMenuItem(item) && item.name === "Pommes";
      });
      if (selected && isMenuItem(selected)) {
        setSelectedItem(selected.name);
        setSelection([selected]);
      } else {
        const orderItem = items.MenuItemByCategory.find(isOrderItem);
      }
    }
  }, [items, selectedItem]);

  function onSelect(e: SelectChangeEvent) {
    if (!selection.length) {
      return;
    }

    const selectedExtra = selection.find(
      (extra) => extra.name === e.target.value
    );

    if (!selectedExtra) {
      return;
    }

    setSelectedItem(selectedExtra.name);

    const isMatch = costumerExtraChoises.some(
      (extra) => extra.name === selectedExtra.name
    );
    if (!isMatch) {
      setCostumerExtraChoises((prevChoises) => [
        ...prevChoises,
        {
          _id: selectedExtra._id,
          name: selectedExtra.name,
          price: selectedExtra.price,
          quantity: 1,
        },
      ]);
    }
  }

  async function submit(res: { _id: string }) {
    try {
      const order = orders.find((order) => order.product._id === res._id);

      if (!order) {
        throw new Error("Order not found");
      }

      await addExtra({
        variables: {
          description,
          id: order._id,
          orderItem: costumerExtraChoises.map((extra) => ({
            name: extra.name,
            price: extra.price,
            _id: extra._id,
            quantity: extra.quantity,
          })),
        },
        onCompleted: () => {
          setExtraOrderModalOpen(false);
          setErrorOnAddExtra("");
        },
      });
    } catch (error) {
      setErrorOnAddExtra("Couldn't add extra");
    }
  }

  function onAddQuantity(result: { _id: string; quantity: number }) {
    setCostumerExtraChoises((prevChoises) =>
      prevChoises.map((item) => {
        if (item._id === result._id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      })
    );
  }

  function onDeleteQuantity(result: { _id: string; quantity: number }) {
    setCostumerExtraChoises((prevChoises) => {
      const updatedChoises = prevChoises.map((item) => {
        if (item._id === result._id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      return updatedChoises.filter((item) => item.quantity >= 1);
    });
  }

  function countQuantity(
    id: string,
    orders: [{ orderQuantity: number; product: { _id: string } }]
  ): number {
    // Ensure the return type is number.
    if (Array.isArray(orders) && id) {
      const result = orders.find((ress) => ress.product?._id === id);
      return result ? result.orderQuantity : 0;
    }
    return 0;
  }

  const MenuItems = costumerExtraChoises.map((result, i) => (
    <ChoisesCard
      key={i}
      setSelection={setCostumerExtraChoises}
      selection={result}
      costumerExtra={result}>
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
  ));

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
                    onError: (e) => {
                      setError("Internal Error");
                    },
                  })
                }
                removeOrder={() =>
                  removeOrder({
                    variables: { productId: res._id },
                    onError: (e) => {
                      setError("Internal Error");
                    },
                  })
                }
                price={res.price}
                quantity={countQuantity(
                  res._id as string,
                  orders as [
                    { orderQuantity: number; product: { _id: string } }
                  ]
                )}
              />

              <CgMore
                onClick={() => setExtraOrderModalOpen(true)}
                className={styles.more_icon}
              />
              <Modal
                isModalOpen={exrasOrderModal}
                setIsModalOpen={setExtraOrderModalOpen}
                label={"Extra"}>
                <div>
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    {ErrorOnSubmit && (
                      <ErrorCard>
                        Something went wrong during your order
                      </ErrorCard>
                    )}{" "}
                    {ErrorOnAddExtra && (
                      <ErrorCard>
                        Something went wrong during add to your order
                      </ErrorCard>
                    )}
                    <Button
                      width="80%"
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        submit(res);
                      }}>
                      Submit
                    </Button>
                  </form>
                  {costumerExtraChoises?.length && MenuItems}
                </div>
              </Modal>
            </div>
          ))}
      </div>
    </div>
  );
}

Items.Layout = PrimaryLayout;
