import React, { useState, useEffect, useCallback } from "react";
import styles from "./Search.module.scss";
import { motion } from "framer-motion";
import isEmpty from "is-empty";
import { FaSearchengin, FaHeart } from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Product_card from "components/productCard";

export default function Search({ products }) {
  const [input, setInput] = useState("");
  // const [gotenProduct, fetchInput, loaded] = useProductByName();
  const [submitedSuggestion, setSubmittedSuggestion] = useState("");

  // useEffect(() => {
  //   if (!isEmpty(input && submitedSuggestion)) {
  //     fetchInput(submitedSuggestion);
  //     setEmptyInput();
  //     // Router.push({ query: { text: input, ...Router.query } });
  //   } else {
  //     fetchInput("");
  //   }
  // }, [submitedSuggestion, input]);
  /*useproduct hook to change product list depend on search input*/

  // const Router = useRouter();
  // // const { data } = useCategoryProducts(route.query);

  // useEffect(() => {
  //   if (Router.query?.value) {
  //     setInput(Router.query?.value);
  //   }
  // }, [Router.query]);

  // const setEmptyInput = useCallback(() => {
  //   if (!isEmpty(input)) {
  //     return;
  //   }
  // }, [input]);

  // useEffect(() => {
  //   if (!isEmpty(input)) {
  //     // props?.setInput(input);
  //     setEmptyInput();
  //     // Router.push({ query: { text: input, ...Router.query } });
  //   } else {
  //   }
  // }, [input]);

  return (
    <div className={styles.shop_search}>
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
            placeholder="search"></input>

          <IoIosCloseCircleOutline
            className={styles.cearIcon}
            onClick={() => {
              setInput("");
            }}
          />
        </div>
      </div>

      {products.map((res) => {
        return <Product_card product={res} />;
      })}
    </div>
  );
}
