import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function withRedirect<P>(
  WrappedComponent: React.ComponentType<P>
) {
  const ComponentWithRedirect = (props: P & JSX.IntrinsicAttributes) => {
    const router = useRouter();
    useEffect(() => {}, []);

    return <WrappedComponent {...props} />;
  };
  return ComponentWithRedirect;
}
