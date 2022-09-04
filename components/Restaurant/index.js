import Link from "next/link";
import React, { Suspense } from "react";
import Menu from "../Menu";
import styles from "./styles.module.scss";
import Image from "next/image";
import BlurImage from "../BlurImage";
import { motion } from "framer-motion";

export default function Restaurant({
  name,
  endPoint,
  children,
  images,
  description,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.restaurant_card_wrapper}>
        <section className={styles.left_card}>
          <div className={styles.images}>
            <Image
              src={images && images[1]}
              width={600}
              height={600}
              layout="responsive"
              alt={name}
            ></Image>
          </div>

          <div className={styles.descriptions_wrapper}>
            <motion.h3
              className={styles.restaurant_label}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {name}
            </motion.h3>
            <span className={styles.restaurant_description}>{description}</span>
            <span className={styles.restaurant_openTime}>
              Closes in 5 hours 30 min | 10AM - 10PM Everyday
            </span>
            <Link scroll={false} href={endPoint}>
              <a className={styles.btn_grad}>Borja att bestella</a>
            </Link>
          </div>
        </section>
        <section className={styles.right_card}>
          <div className={styles.images}>
            <Image
              src={images && images[1]}
              width={600}
              height={600}
              layout="responsive"
              alt={name}
            ></Image>
          </div>
          <div className={styles.images}>
            <Image
              src={images && images[1]}
              width={600}
              height={600}
              layout="responsive"
              alt={name}
            ></Image>
          </div>
        </section>
      </div>
    </div>
  );
}
