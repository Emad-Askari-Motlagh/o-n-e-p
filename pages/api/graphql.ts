import userSchema from "@/server/mongoSchema/userSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "@/server/graphql/typeDef/schema.graphql";
import resolvers from "@/server/graphql/resolvers";
import dbInit from "@/lib/dbInit";
import JWT, { JwtPayload } from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import { getSession } from "next-auth/react";
import { createServer } from "http";
import { PubSub } from "graphql-subscriptions";

interface ReturnContext {
  id: string;
}

const pubSub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = createServer((req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "OPTIONS, GET, POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Length": "0",
    });
    res.end();
  } else if (req.method === "POST" && req.url === "/graphql") {
    const chunks: any[] = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", async () => {
      const body = Buffer.concat(chunks).toString();
      const { token, costumerId } = req.cookies;

      await dbInit();

      let id: string | number | null = null;
      let user: object | null = null;

      try {
        if (token) {
          let obj = JWT.verify(token, "MY_SECRET");
          id = (obj as ReturnContext).id;
        }

        const session = await getSession({ req });

        if (session) {
          id = session?._id;
        }
      } catch (err) {
        console.error("error on apollo server", err);
        throw new AuthenticationError(
          "Authentication token is invalid, please log in"
        );
      }

      const context = {
        userId: id,
        costumerId,
        user,
        pubSub,
      };

      const { execute, parse } = require("graphql");

      execute({
        schema,
        document: parse(body),
        contextValue: context,
      }).then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization"
        );
        res.setHeader(
          "Access-Control-Allow-Methods",
          "OPTIONS, GET, POST, DELETE"
        );
        res.end(JSON.stringify(result));
      });
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

export default server;
