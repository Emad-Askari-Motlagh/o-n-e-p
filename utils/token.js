import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, "MY_SECRET");
  } catch {
    return null;
  }
};
