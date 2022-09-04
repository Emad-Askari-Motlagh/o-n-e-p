import JWT from "jsonwebtoken";
const parsToken = (token) => {
  const data = JWT.verify(token, "MY_SECRET");
  return data;
};
export default parsToken;
