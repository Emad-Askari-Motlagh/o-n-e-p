import { useProvideAuth } from "hooks/Context.hook";
import React, { ReactComponentElement } from "react";

const withState = (Component: React.ReactNode) => {
  return (props) => {
    const { signOut, user, costumerData, signOutCostumer } = useProvideAuth();
    return (
      <Component
        {...props}
        emi="emi"
        signOut={signOut}
        user={user}
        costumerData={costumerData}
        signOutCostumer={signOutCostumer}
      />
    );
  };
};
export default withState;
