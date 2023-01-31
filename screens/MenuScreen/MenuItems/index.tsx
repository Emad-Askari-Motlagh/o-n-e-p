import MenuItem from "components/MenuItem";
import PrimaryLayout from "components/Primary-layout";
import useOrders from "hooks/Order.hook";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Form from "components/MenuItem/Form";
import ChoisesCard from "components/MenuItem/ChoisesCard";
import Selection from "components/Selection";

export default function Items({ items }) {
  const Router = useRouter();
  const options = [
    { id: 1, value: "Choose an extra item", quantity: 0 },
    { id: 2, value: "Fries", quantity: 0 },
    { id: 3, value: "Drink", quantity: 0 },
  ];
  const [selectedItem, setSelectedItem] = useState("Choose an extra item");
  const [selection, setSelection] = useState([]);

  const {
    orders,
    removeOrder,
    addOrder,
    loading: orderLoading,
    AdminOrders,
  } = useOrders();

  const restaurant = Router.query?.name as string;

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
            <MenuItem
              key={res?._id || i}
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
              itemsChildren={
                <>
                  <Form onSubmit={() => null}>
                    <Selection
                      value={selectedItem}
                      onChange={(e) => {
                        const r = selection.some(
                          (r) => r.value === e.target.value
                        );
                        if (r) {
                          return;
                        }
                        setSelection([
                          ...selection,
                          {
                            id: selection.length,
                            value: e.target.value,
                            quantity: 1,
                          },
                        ]);
                      }}
                      label="Choose an extra"
                      options={options}
                    />
                  </Form>
                  {selection?.map((result, i) => (
                    <ChoisesCard
                      key={result.id}
                      setSelection={setSelection}
                      selection={result}
                      costumerExtra={res.value}>
                      <span
                        style={{ color: "wheat" }}
                        className={styles.signs}
                        onClick={() => {
                          setSelection(
                            selection.map((item) => {
                              if (item.id === i) {
                                return {
                                  ...item,
                                  value: item.value,
                                  quantity: (item.quantity += 1),
                                };
                              }
                              return item;
                            })
                          );
                        }}>
                        +
                      </span>
                      <span
                        className={styles.signs}
                        style={{ color: "wheat" }}
                        onClick={() => {
                          setSelection(
                            selection.map((item) => {
                              if (item.id === result.id) {
                                return {
                                  ...item,
                                  value: item.value,
                                  quantity: (item.quantity -= 1),
                                };
                              }
                              return item;
                            })
                          );
                          if (result.quantity < 1) {
                            setSelection(
                              selection.filter((r) => r.id !== result.id)
                            );
                          }
                          return selection;
                        }}>
                        -
                      </span>
                    </ChoisesCard>
                  ))}
                </>
              }
            />
          ))}
      </div>
    </div>
  );
}

Items.Layout = PrimaryLayout;
