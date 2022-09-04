import React from "react";
import style from "./OuterMargin.module.scss";

export default function index(props) {
  return (
    <div
      style={{
        margin: `${props.width} ${props.height}`,
      }}
      className={style.container}
    >
      {props.children}
    </div>
  );
}
