import JWT from "jsonwebtoken";

export default function storeJwt(value: object | []) {
  if (!value) {
    return null;
  }
  return JWT.sign(value, "MY_SECRET");
}
