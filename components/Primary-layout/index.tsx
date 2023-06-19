import style from "./Layout.module.scss";
import Sidebar from "components/Sidebar";
import RouteBar from "components/RouteIndicator";
import Footer from "components/Footer";
import HeaderScreen from "components/Header";
import useVisible from "hooks/useVisible";
import { useRouter } from "next/router";
import Sammary from "components/OrdersSammary";
import { ReactNode } from "react";
import WithHigherOrder from "../../Hoc/withState";
import {
  CostumerQueryResult,
  CurrentUserQueryResult,
  SignOutCostumerMutationFn,
  SignOutMutationFn,
} from "@/server/generated/graphql";
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
    <div className={style.layout}>
      <header className={style.header}>
        <HeaderScreen
          user={user}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          costumer={costumerData}
        />
      </header>
      <aside
        className={style.aside}
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

      <main className={style.main}>
        <div style={{ width: "100%" }}>
          <RouteBar user={user} />
        </div>
        {children}
        {costumerData?.data && router.query.name && (
          <Sammary costumerData={costumerData.data.Costumer} />
        )}
      </main>

      <footer className={style.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default WithHigherOrder(PrimaryLayout);
