import React from "react";

const Ok = ({ removeOrder, id, addOrder, quantity }) => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <span
        onClick={() => {
          addOrder({
            variables: { productId: id },
          });
        }}
      >
        +
      </span>
      <span>{quantity}</span>
      <span
        onClick={() =>
          removeOrder({
            variables: { productId: id },
          })
        }
      >
        -
      </span>
    </div>
  );
};

export default Ok;
