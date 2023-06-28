import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import RouteBarItem from "./RouteBarItem";
import { I_UserDocument } from "@/server/mongoSchema/userSchema";

interface RouteBarProps {
  user: I_UserDocument;
}

const RouteBar: React.FC<RouteBarProps> = ({ user }) => {
  const [allRoutes, setAllRoutes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ee = decodeURI(router.asPath).split("/");
    setAllRoutes(ee.filter((res) => res));
  }, [router.asPath]);

  if (allRoutes[0] !== "restaurant" && allRoutes[0] !== "admin") return null;

  return (
    <div className={styles.container}>
      <ul className={styles.list_parent}>
        {allRoutes.map((res, i) => {
          return (
            <RouteBarItem
              key={i}
              name={res}
              user={user}
              src={decodeURI(router.asPath).split(allRoutes[i + 1])[0]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default RouteBar;
