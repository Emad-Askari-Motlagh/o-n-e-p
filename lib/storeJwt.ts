import JWT from "jsonwebtoken";

export default function storeJwt(value: object | []) {
  if (!value) {
    return null;
  }
  return JWT.sign(value, "MY_SECRET");
}
export function decodeJwt(value: string) {
  if (!value) {
    return null;
  }
  return JWT.decode(value);
}
