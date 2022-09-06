import Link from "next/link";
import { useRouter } from "node_modules/next/router";

import React, { useEffect, useState } from "react";
import captalizer from "utils/captalizeFirstLetter";
import styles from "./styles.module.scss";

export default function RouteBarItem({ name, color, src, user }) {
  const [sideBarClassName, setSideBarClassName] = useState();
  const router = useRouter();
  useEffect(() => {
    //split the route ang get the current route part
    router.asPath
      .split("/")
      [router.asPath.split("/").length - 1].toLowerCase() === name.toLowerCase()
      ? setSideBarClassName("sideBar1WithIndicator")
      : setSideBarClassName("sideBar1");
  }, [router.asPath, name]);

  return (
    <div
      className={styles.routeItemParent}
      style={{
        display: decodeURI(router.asPath.toLowerCase()).match(
          name.toLowerCase()
        )
          ? "initial"
          : "none",
      }}>
      <li className={styles.li}>
        <Link href={src}>
          <a className={styles[sideBarClassName]}>
            {user?._id === captalizer(name) ? user.name : `${captalizer(name)}`}
          </a>
        </Link>
      </li>
    </div>
  );
}
