import { getCurrent } from "@/server/graphql/querys/querys";

const checkUserLogedIn = (apolloClient) =>
  apolloClient
    .query({
      query: getCurrent,
    })
    .then(({ data }) => {
      // will return true if user is authenticated
      return { user: data.getCurrentUser, isAuthenticated: true };
    })
    .catch(() => {
      // Fail gracefully
      return { isAuthenticated: false };
    });
export default checkUserLogedIn;
