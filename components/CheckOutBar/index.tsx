import React from "react";
import styles from "./styles.module.scss";
import { BiRightDownArrowCircle } from "react-icons/bi";
import LinkButton from "../LinkButton";
import { useRouter } from "next/router";

interface CheckOutBarProps {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const CheckOutBar: React.FC<CheckOutBarProps> = ({ onClick }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.parent}>
        <LinkButton href={`/${router.query.name}/checkout`}>
          Checkout
        </LinkButton>
        <div className={styles.downArrow_parent}>
          <div className={styles.items_view_label}>See your items</div>
          <div className={styles.downArrow}>
            <BiRightDownArrowCircle onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOutBar;
