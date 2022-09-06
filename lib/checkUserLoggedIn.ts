import { GET_CURRENT_USER } from "@/server/graphql/querys/querys.graphql";

type Data = {
  user: { data: { getCurrentUser: object } };
  isAuthenticated: boolean;
};
const checkUserLogedIn: object = (apolloClient) =>
  apolloClient
    .query({
      query: GET_CURRENT_USER,
    })
    .then(({ data }) => {
      // will return true if user is authenticated
      return { user: data.getCurrentUser, isAuthenticated: true } as Data;
    })
    .catch(() => {
      // Fail gracefully
      return { isAuthenticated: false };
    });

export default checkUserLogedIn;
