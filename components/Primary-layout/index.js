import style from "./Layout.module.scss";
import Sidebar from "components/Sidebar";
import RouteBar from "components/RouteIndicator";
import PageTwo from "components/Footer";
import HeaderScreen from "components/Header";
import useVisible from "hooks/useVisible";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CURRENT_USER,
  GET_COSTUMER,
  GET_ORDERS_CONSTANTLY,
} from "@/server/graphql/querys/querys";
import { useProvideAuth } from "hooks/Context.hook";
import { SIGN_OUT_COSTUMER } from "server/graphql/querys/mutations";
import Sammary from "components/OrdersSammary";

export default function PrimaryLayout({ children, isCurrent }) {
  const { isVisible, setIsVisible, ref } = useVisible(false);
  const router = useRouter();
  const userData = useQuery(GET_CURRENT_USER);

  const costumerData = useQuery(GET_COSTUMER);
  const [signOutCostumer] = useMutation(SIGN_OUT_COSTUMER);
  const { signOut, user } = useProvideAuth();

  return (
    <div className={style.layout}>
      <header className={style.header}>
        <HeaderScreen
          user={userData}
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
          restaurant={user ? user.restaurant.name : router.query?.name}
          setIsVisible={setIsVisible}
          elementRef={ref}
          signOut={user ? signOut : signOutCostumer}
          isAdmin={user ? true : null}
          costumerData={costumerData}
          user={userData}
        />
      </aside>

      <main className={style.main}>
        <div style={{ width: "100%" }}>
          <RouteBar />
        </div>
        {children}
        {costumerData?.data?.getCostumer && router.query.name && (
          <Sammary costumerData={costumerData} />
        )}
      </main>

      <footer className={style.footer}>
        <PageTwo />
      </footer>
    </div>
  );
}
