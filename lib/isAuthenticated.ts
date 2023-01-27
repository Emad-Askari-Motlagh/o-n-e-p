import { NextRequest } from "next/server";

export default function isAuthenticated(request: NextRequest) {
  //   console.log(request.cookies);
  //   const token = JSON.parse(request.cookies);
  //   console.log(token);
  if (true) {
    return true;
  } else {
    return false;
  }
}
