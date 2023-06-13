import Link from "next/link";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import captalizer from "utils/captalizeFirstLetter";
import styles from "./styles.module.scss";
import { I_UserDocument } from "@/server/mongoSchema/userSchema";

interface RouteBarItemProps {
  name: string;
  color?: string;
  src: string;
  user: I_UserDocument;
}

export default function RouteBarItem({
  name,
  color,
  src,
  user,
}: RouteBarItemProps) {
  const [sideBarClassName, setSideBarClassName] = useState<string>();

  const router = useRouter();

  useEffect(() => {
    // split the route and get the current route part
    const currentRoutePart = router.asPath
      .split("/")
      [router.asPath.split("/").length - 1].toLowerCase();

    const newSideBarClassName =
      currentRoutePart === name.toLowerCase()
        ? "sideBar1WithIndicator"
        : "sideBar1";

    setSideBarClassName(newSideBarClassName);
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
        <span style={{ color: "whitesmoke", marginRight: "0.1em" }}>➢</span>
        <Link href={src}>
          <a className={styles[sideBarClassName]}>
            {user?._id === captalizer(name) ? user.name : `${captalizer(name)}`}
          </a>
        </Link>
      </li>
    </div>
  );
}
