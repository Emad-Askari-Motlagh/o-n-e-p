import React, { useState, useEffect } from "react";
import styles from "./Product.module.scss";

import Button from "react-bootstrap/Button";
import axios from "axios";
import { IoMdDoneAll } from "react-icons/io";

import { Alert } from "react-bootstrap";
import { FaSearchengin, FaHeart } from "react-icons/fa";
import Image from "next/image";
export default function Product({ product, id }) {
  const selectedProduct = product;
  const price = selectedProduct?.price;
  const text = product?.name;
  const productId = selectedProduct?.id;
  const images = selectedProduct?.image;
  const description = selectedProduct?.description;
  const date = selectedProduct?.createdAt;
  const location = selectedProduct?.location;
  const [added, setAdded] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [addToCartError, setAddToCArtError] = useState();
  const [addedToCart, setAddedToCArt] = useState(false);

  const removeEvent = (id) => {
    setFavorite(false);
  };
  const addEvent = (id) => {
    setFavorite(true);
  };
  const addToCart = async () => {
    setAddedToCArt(false);

    try {
    } catch (error) {
      setAddToCArtError(error.reponce?.data);
    }
  };
  const favoriteEvent = () => {};

  return (
    <main className={styles.main}>
      <div className={styles.photosContainer}>
        <div className={styles.carouselContainer}>
          <Image
            alt="/productCard"
            src={product.image}
            width={200}
            height={200}
          />
        </div>

        <hr />
      </div>
      <div className={styles.productInfos}>
        <div className={styles.header}>
          <h1 className={styles.productTitle}>{text || ""}</h1>
        </div>
        <span className={styles.priceText}>{price || 0}$</span>
        <div className={styles.saleContainer}>
          <span className={styles.saleText}>{price || 0}$</span>
          <span className={styles.savedText}>
            {"(You will be saved " + (price - price) + "$!)"}
          </span>
        </div>
        <hr />
        <div className={styles.sizes}>
          <h4 className={styles.sizesText}>Sizes</h4>
        </div>
        <hr />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className={styles.buttons}>
            <Button style={{ margin: 0 }} onClick={addToCart}>
              Add to Cart
            </Button>
            <button className={styles.favButton} onClick={favoriteEvent}>
              {isFavorite ? (
                <FaHeart width={24} height={24} />
              ) : (
                <FaHeart width={24} height={24} />
              )}
            </button>
          </div>
          {addedToCart && (
            <Alert
              show={() =>
                setTimeout(() => {
                  return false;
                }, 2000)
              }
              variant="success">
              Added to basket
              <IoMdDoneAll />
            </Alert>
          )}
        </div>

        <hr />
        <div className={styles.infoContainer}>
          <h4 className={styles.sizesText}>Product Information</h4>
          <p className={styles.infoText}>{"information"}</p>
        </div>
        <Button style={{ margin: 0 }} onClick={addToCart}>
          Contact the seller
        </Button>
      </div>
    </main>
  );
}
