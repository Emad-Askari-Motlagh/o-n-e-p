import dbInit from "@/lib/dbInit";
import { NextApiRequest } from "next";
import { decodeJwt } from "@/lib/storeJwt";
import userSchema from "@/server/mongoSchema/userSchema";

export default function Admin(): null {
  return null;
}

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  try {
    // Initialize MongoDB
    await dbInit();

    const token = req.cookies["token"];

    if (!token) {
      // If no token is found, redirect to the restaurant page
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const user = decodeJwt(token as string);

    if (!user || !user.id) {
      // If the token is invalid or user ID is not present, redirect to the restaurant page
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    const userObj = await userSchema.findById(user.id).populate("restaurant");

    if (!userObj) {
      // If the user is not found, redirect to the restaurant page
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return {
      redirect: {
        destination: `/admin/${userObj.restaurant.name}`,
        permanent: false,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
