import userSchema from "@/server/mongoSchema/userSchema";
import { NextApiRequest } from "next";
// import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "@/server/graphql/typeDef/schema.graphql";
import resolvers from "@/server/graphql/resolvers";
import dbInit from "@/lib/dbInit";
import JWT, { JwtPayload } from "jsonwebtoken";

// const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

import {
  createServer,
  createPubSub,
  GraphQLYogaError,
} from "@graphql-yoga/node";
import { AuthenticationError } from "apollo-server-core";
import { getSession } from "next-auth/react";

interface ReturnContext {
  id: string;
}

const pubSub = createPubSub();

const server = createServer({
  cors: {
    credentials: true,
    origin: [process.env.SERVER_LINK], // your frontend url.
  },

  plugins: [],

  context: async ({ req }: { req: NextApiRequest }) => {
    await dbInit();
    let { token, costumerId } = req.cookies;
    const session = await getSession({
      req,
    });

    // 1. Find optional visitor id
    let id: string | number | null = null;
    let user: object | null = null;

    try {
      if (token) {
        let obj = JWT.verify(token, "MY_SECRET");
        id = (obj as ReturnContext).id;
      }

      if (session) {
        id = session?._id;
      }
    } catch (err) {
      console.error("error on apollo server", err); // expired token, invalid token
      // TODO try apollo-link-error on the client
      throw new AuthenticationError(
        "Authentication token is invalid, please log in"
      );
    }

    return {
      userId: id,
      costumerId,
      user,
      pubSub,
    };
  },
  schema,
});

export default server;
