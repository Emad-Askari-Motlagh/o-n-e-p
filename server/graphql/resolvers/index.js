// ./graphql/resolvers/index.js
import { mergeResolvers } from "@graphql-tools/merge";
import restaurangtResolver from "./restaurantResolvers";
import userResolvers from "./userResolvers";
import menuResolvers from "./menuResolvers";
import costumerSchema from "./costumerResolvers";
import orderResolvers from "./orderResolvers";
import paymentResolvers from "./paymentResolvers";
import kontaktResolvers from "./kontaktResolvers"
//Merge all resolvers before send to apollo
const resolvers = [
  userResolvers,
  restaurangtResolver,
  menuResolvers,
  costumerSchema,
  orderResolvers,
  paymentResolvers,
  kontaktResolvers
];

export default mergeResolvers(resolvers);
