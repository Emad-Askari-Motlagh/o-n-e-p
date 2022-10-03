import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import BlurImage from "../BlurImage";
import CategoryEditor from "../CategoryEditor";
import Modal from "../Modal";

function RestaurantSubItem({ label, image, endPoint }) {
  const Router = useRouter();

  return (
    <Link href={`${Router.asPath}/${endPoint?.toLowerCase()}`}>
      <div className={styles.items_card_container}>
        <Image
          alt="Sub Item"
          className={styles.image}
          width="800"
          height="800"
          src={image}
          layout="intrinsic"></Image>
        <div className={styles.item}>
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
}
export default RestaurantSubItem;
