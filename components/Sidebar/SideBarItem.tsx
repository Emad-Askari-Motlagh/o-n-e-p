import Link from "next/link";
import { useRouter } from "node_modules/next/router";

import { useEffect, useState } from "react";
import styles from "./sidebar.module.scss";

interface Props {
  endPoint: string;
  itemsLabel: string;
  leftIcon: any;
  rightIcon: any;
}
export default function SideBarItem({
  endPoint,
  itemsLabel,
  leftIcon,
  rightIcon,
}: Props) {
  const [sideBarClassName, setSideBarClassName] = useState("sideBar1");
  const { asPath } = useRouter();
  const pathArray = decodeURI(asPath).split("/");
  const endpointArray = decodeURI(endPoint).split("/");
  useEffect(() => {
    pathArray[pathArray.length - 1].includes(
      endpointArray[endpointArray.length - 1]
    )
      ? setSideBarClassName("sideBar1WithIndicator")
      : setSideBarClassName("sideBar1");
  }, [asPath, endPoint, pathArray, endpointArray]);

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
