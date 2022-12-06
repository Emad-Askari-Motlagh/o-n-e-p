// ./graphql/resolvers/index.js
import { mergeResolvers } from "@graphql-tools/merge";
import restaurangtResolver from "./restaurantResolvers";
import userResolvers from "./userResolvers";
import menuResolvers from "./menuResolvers";
import costumerSchema from "./costumerResolvers";
import sellResolvers from "./sellResolver";
import paymentResolvers from "./paymentResolvers";
import kontaktResolvers from "./kontaktResolvers";
import orderResolvers from "./orderResolvers";
//Merge all resolvers before send to apollo
const resolvers = [
  userResolvers,
  restaurangtResolver,
  menuResolvers,
  costumerSchema,
  orderResolvers,
  paymentResolvers,
  kontaktResolvers,
  sellResolvers,
];

export default mergeResolvers(resolvers);
