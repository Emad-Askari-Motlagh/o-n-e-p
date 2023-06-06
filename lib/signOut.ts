import cookie from "cookie";
import redirect from "./redirect";

const signout = async (apolloClient: any) => {
  document.cookie = cookie.serialize("token", "", {
    path: "/",
    maxAge: -1,
  });

  redirect({}, "/signin");

  await apolloClient.resetStore();
};

export default signout;
