import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

interface RestaurantSubItemProps {
  label: string;
  image: string;
  endPoint: string;
}
function RestaurantSubItem({ label, image, endPoint }: RestaurantSubItemProps) {
  const Router = useRouter();

  return (
    <Link href={`${Router.asPath}/${endPoint?.toLowerCase()}`}>
      <div className={styles.items_card_container}>
        {image && (
          <Image
            alt="Sub Item"
            width={"800"}
            height={"800"}
            className={styles.image}
            objectFit="cover"
            objectPosition="center"
            src={image}
            layout="intrinsic"
            priority
            loading="lazy"></Image>
        )}
        <div className={styles.item}>
          <span>{label}</span>
        </div>
      </div>
    </Link>
  );
}
export default RestaurantSubItem;
