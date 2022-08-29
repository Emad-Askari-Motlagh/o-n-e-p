// ./graphql/resolvers/index.js
import { mergeResolvers } from "@graphql-tools/merge";
import orderResolvers from "./orderResolvers";
import kontaktResolvers from "./kontaktResolvers";
//Merge all resolvers before send to apollo
const resolvers = [orderResolvers, kontaktResolvers];

export default mergeResolvers(resolvers);
