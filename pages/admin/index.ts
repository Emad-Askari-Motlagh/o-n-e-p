import dbInit from "@/lib/dbInit";
import { NextApiRequest } from "next";
import { decodeJwt } from "@/lib/storeJwt";
import userSchema from "@/server/mongoSchema/userSchema";

export default function Admin() {
  return null;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    //Init mongoDb
    const token = req.cookies["token"];

    await dbInit();
    const user = decodeJwt(token as string);
    const userObj = await userSchema.findById(user?.id).populate("restaurant");
    // //Init Apollo client
    //Get the cookie from the req
    if (token) {
      return {
        redirect: {
          destination: `/admin/${userObj.restaurant.name}`,
          permanent: false,
          // statusCode: 301
        },
      };
    } else {
      return {
        redirect: {
          destination: `/restaurant`,
          permanent: false,
          // statusCode: 301
        },
      };
    }
  } catch (error) {
    return error;
  }
}
