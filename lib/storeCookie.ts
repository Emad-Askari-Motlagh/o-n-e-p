import cookie from "cookie";
import { Http2ServerResponse } from "http2";
import { NextApiResponse } from "next";

const deleteCookieOptions = {
  httpOnly: true,
  maxAge: -1,
  path: "/",
  sameSite: true,
  secure: process.env.NODE_ENV == "production",
};

// Store the token in cookie // solution 1
const storeCookie = (
  value: object | [],
  res: NextApiResponse,
  expireTime: number
) => {
  const cookieArray: any = [];
  const cookieOptions = {
    httpOnly: true,
    maxAge: expireTime,
    path: "/",
    sameSite: true,
    secure: process.env.NODE_ENV == "production",
  };
  if (Array.isArray(value)) {
    //If was an array
    value.map((res: {}) =>
      Object.entries(res).map((res) => cookieArray.push(res))
    );
  } else {
    Object.entries(value).map((res) => cookieArray.push(res));
  }

  //Set the cookie header
  res?.setHeader(
    "Set-Cookie",
    cookieArray.map((res: string[]) => [
      cookie.serialize(res[0], res[1], cookieOptions),
    ])
  );
};

//Delete the cookie
const deleteCookie = (name: string | string[], res: NextApiResponse) => {
  //If we want to delete more than one cookie in a time // array of cookies names
  if (Array.isArray(name)) {
    res.setHeader(
      "Set-Cookie",
      name.map((res) => cookie.serialize(res, null as any, deleteCookieOptions))
    );
  } else {
    //delete single cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(name, null as any, deleteCookieOptions)
    );
  }
};

//Function to delete a cookie in certain amount of time
function AutoDestroyCookie(
  name: string,
  res: NextApiResponse,
  tokenMaxAge: number
) {
  const nowTime = new Date().getTime();
  const maxAge = nowTime + tokenMaxAge;
  //Check if the cookie expiration time was in past then we delete the cookie
  if (maxAge < new Date().getTime()) {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(name, null as any, deleteCookieOptions)
    );
  }
}
/**
 * Adds the user token cookie to a response.
 */

export { deleteCookie, storeCookie, AutoDestroyCookie };
