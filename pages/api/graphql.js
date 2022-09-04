// import { createServer } from "@graphql-yoga/node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "@/server/graphql/typeDef/schema.graphql";
import resolvers from "@/server/graphql/resolvers";
import dbInit from "@/lib/dbInit";
import JWT from "jsonwebtoken";
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

let serverCleanup = null;

const server = createServer({
  // cors: {
  //   origin: [
  //     "https://order-app-graphql-mongo.vercel.app",
  //     "http://localhost:3000",
  //   ],
  //   credentials: true,
  //   allowedHeaders: ["X-Custom-Header"],
  //   methods: ["POST"],
  // },
  cors: false,
  plugins: [
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup?.dispose();
          },
        };
      },
    },
  ],

  context: async (ctx) => {
    // const pubsub = await createPubSub();
    await dbInit();

    let { token, costumerId, costumerExpire } = ctx.req.cookies;
    // 1. Find optional visitor id
    let id = null;
    let user = null;
    if (token) {
      try {
        let obj = JWT.verify(token, "MY_SECRET");

        id = obj.id;
      } catch (err) {
        console.error("error on apollo server", err); // expired token, invalid token
        // TODO try apollo-link-error on the client
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }
    }
    return {
      ...ctx,
      userId: id,
      costumerId,
      user,
      // pubsub,
    };
  },
  schema,
});

export default server;
