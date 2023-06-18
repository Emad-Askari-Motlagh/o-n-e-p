import Link from "next/link";
import React, { Suspense, useEffect } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";
import { IoNavigateCircle } from "react-icons/io5";
import LinkButton from "../LinkButton";

interface RetaurantProps {
  name?: string;
  endPoint: string;
  children?: JSX.Element;
  images?: string | string[];
  description?: string;
  location?: { coordinates: number[] };
  buttonLabel?: string;
  openTimes?: string;
}
export default function Restaurant({
  name,
  endPoint,
  children,
  images,
  description,
  location,
  buttonLabel,
  openTimes,
}: RetaurantProps) {
  return (
    <div className={styles.container}>
      <div className={styles.restaurant_card_wrapper}>
        <section className={styles.left_card}>
          <div className={styles.images}>
            <Image
              src={images && images?.[0]}
              width={600}
              height={600}
              layout="responsive"
              alt={name}></Image>
          </div>

          <div className={styles.descriptions_wrapper}>
            <motion.h3
              className={styles.restaurant_label}
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}>
              {name}
            </motion.h3>
            <span className={styles.restaurant_description}>{description}</span>
            <span className={styles.restaurant_openTime}>
              <span>Open Times: </span>
              <span>{openTimes}</span>
            </span>

            <div className={styles.map_parent}>
              <a
                href={`/map?name=${name}&lat=${location.coordinates?.[0]}&lng=${location.coordinates?.[1]}`}>
                <IoNavigateCircle className={styles.icon} />
                <span>Find on map</span>
              </a>
            </div>

            <LinkButton width="80%" href={endPoint}>
              {buttonLabel}
            </LinkButton>
          </div>
        </section>
      </div>
    </div>
  );
}
