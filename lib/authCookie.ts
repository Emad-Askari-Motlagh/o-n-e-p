import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

const cookieOptions = {
  httpOnly: true,
  maxAge: 300000,
  path: "/",
  sameSite: true,
  secure: process.env.NODE_ENV == "production",
};

export async function setUserCookie(
  request: NextApiRequest,
  response: NextApiResponse,
  name: string,
  value: string
): Promise<NextApiResponse> {
  const fetchedCookie = request.cookies["costumerId"];

  if (!fetchedCookie) {
    response.setHeader(
      "Set-Cookie",
      cookie.serialize(name, value, cookieOptions)
    );
  }

  return response;
}
