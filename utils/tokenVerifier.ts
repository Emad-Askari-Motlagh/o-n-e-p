import jwt from "jsonwebtoken";

export const verifyToken = (token: string | undefined): string | null => {
  if (!token) return null;
  try {
    return jwt.verify(token, "MY_SECRET") as string;
  } catch {
    return null;
  }
};
