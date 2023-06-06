import jwt, { JwtPayload } from "jsonwebtoken";

const parseToken = (token: string): JwtPayload => {
  const data = jwt.verify(token, "MY_SECRET") as JwtPayload;
  return data;
};

export default parseToken;
