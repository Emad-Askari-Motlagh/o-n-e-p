import React, { ReactNode } from "react";
import useVisible from "hooks/useVisible";
import { useRouter } from "next/router";
import Sammary from "components/OrdersSammary";
import {
  CostumerQueryResult,
  CurrentUserQueryResult,
  SignOutCostumerMutationFn,
  SignOutMutationFn,
} from "@/server/generated/graphql";
import styles from "./Layout.module.scss";
import WithAuthState from "../../Hoc/withAuthState";
import dynamic from "next/dynamic";
import SimpleLoading from "../SimpleLoading";
// Lazy load the Footer and HeaderScreen and SideBar components
const RouteBar = dynamic(() => import("@/components/RouteBar"), {
  loading: () => <SimpleLoading />,
});
const Sidebar = dynamic(() => import("@/components/Sidebar"), {
  loading: () => <SimpleLoading />,
});
const Footer = dynamic(() => import("components/Footer"), {
  loading: () => <SimpleLoading />,
});
const HeaderScreen = dynamic(() => import("components/Header"), {
  loading: () => <SimpleLoading />,
});

type LayoutProps = {
  children: ReactNode;
  isCurrent: boolean;
  signOut: SignOutMutationFn;
  user: CurrentUserQueryResult;
  costumerData: CostumerQueryResult;
  signOutCostumer: SignOutCostumerMutationFn;
};

function PrimaryLayout({
  children,
  isCurrent,
  signOut,
  user,
  costumerData,
  signOutCostumer,
}: LayoutProps) {
  const { isVisible, setIsVisible, ref } = useVisible(false);
  const router = useRouter();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <HeaderScreen
          user={user}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          costumer={costumerData}
        />
      </header>
      <aside
        className={styles.sidebar}
        style={{
          left: isVisible ? 0 : "-250px",
        }}>
        <Sidebar
          isCurrent={isCurrent}
          isVisible={isVisible}
          restaurant={
            (user
              ? user.data?.CurrentUser?.restaurant.name
              : router.query?.name) as string
          }
          setIsVisible={setIsVisible}
          elementRef={ref}
          signOut={user.data?.CurrentUser ? signOut : signOutCostumer}
          isAdmin={user ? true : false}
          costumerData={costumerData.data}
          user={user.data?.CurrentUser}
        />
      </aside>

      <main className={styles.main}>
        <div style={{ width: "100%" }}>
          <RouteBar user={user} />
        </div>
        {children}
        {costumerData?.data && router.query.name && <Sammary />}
      </main>

      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default WithAuthState(PrimaryLayout);
