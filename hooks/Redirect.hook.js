import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";

export default function useRedirect({ error, endPoint }) {
  const router = useRouter();

  function redirect() {
    router.push(endPoint);
  }

  return {
    redirect,
  };
}
