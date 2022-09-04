import React, { useEffect, useRef, useState } from "react";
import styles from "./auth.module.scss";

export default function Resetpass() {
  const [email, setEmail] = useState("");
  const formRef = useRef();

  function formSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.loginfirstdiv}>
      <h5 style={{ fontSize: "1vw", fontWeight: "700" }}>{}</h5>

      <form
        ref={formRef}
        onSubmit={formSubmit}
        style={{ display: "flex", flexDirection: "column" }}>
        <input
          className={styles.logininputs}
          name="email"
          placeholder="email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <button style={{ fontSize: "1vw" }} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
