import JWT from "jsonwebtoken";

export default async function storeJwt(value) {
  if (!value) {
    return null;
  }
  return await JWT.sign(value, "MY_SECRET");
}
