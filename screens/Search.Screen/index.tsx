import React, { useState, useEffect } from "react";
import styles from "./Search.module.scss";
import { motion } from "framer-motion";
import isEmpty from "is-empty";
import { FaSearchengin, FaHeart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Product_card from "components/productCard";

export default function Search({ products }) {
  const [input, setInput] = useState("");
  const [submitedSuggestion, setSubmittedSuggestion] = useState("");

  return (
    <div className={styles.shop_search}>
      {/* Search Form */}
      <div className={styles.shop_form}>
        <motion.h3
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.shop_h3}>
          search product
        </motion.h3>
        <div className={styles.searchContents}>
          <FaSearchengin className={styles.search_icon} size={32} />
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={!isEmpty(submitedSuggestion) ? submitedSuggestion : input}
            className={styles.shop_input}
            placeholder="search"
          />

          <IoIosCloseCircleOutline
            className={styles.cearIcon}
            onClick={() => {
              setInput("");
            }}
          />
        </div>
      </div>

      {/* Product Cards */}
      {products.map((res) => {
        return <Product_card key={res._id} product={res} />;
      })}
    </div>
  );
}
