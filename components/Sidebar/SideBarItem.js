import Link from "next/link";
import { useRouter } from "node_modules/next/router";

import { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";

export default function SideBarItem({
  endPoint,
  itemsLabel,
  leftIcon,
  rightIcon,
}) {
  const [sideBarClassName, setSideBarClassName] = useState("sideBar1");
  const { asPath } = useRouter();

  useEffect(() => {
    Router.asPath === endPoint
      ? setSideBarClassName("sideBar1WithIndicator")
      : setSideBarClassName("sideBar1");
  }, [asPath, endPoint]);

  return (
    <div className={styles.menu_item}>
      <div className={styles.menu_item_layer_one}>
        <div className={styles[sideBarClassName]} />
        <span className={styles.icon_button}>{leftIcon}</span>
        <Link href={endPoint ?? "#"}>
          <a rel="noopener">{itemsLabel}</a>
        </Link>
        <div className={styles.icon_right}> {rightIcon}</div>
      </div>
    </div>
  );
}
