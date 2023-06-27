import { useUser } from "hooks/Context.hook";
import React from "react";

function withAuthState<P>(Component: React.ComponentType<P>) {
  const ComponentWithState = (props: P & JSX.IntrinsicAttributes) => {
    const { signOut, user, costumerData, signOutCostumer } = useUser();
    return (
      <Component
        {...props}
        signOut={signOut}
        user={user}
        costumerData={costumerData}
        signOutCostumer={signOutCostumer}
      />
    );
  };
  return ComponentWithState;
}
export default withAuthState;
