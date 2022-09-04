import Router from "next/router";
import { removeDirectivesFromDocument } from "node_modules/apollo-utilities/lib/transform";

const redirect = (res, target) => {
  // In the browser, we just pretend like this never even happened ;)
  Router.replace(target);
};
export default removeDirectivesFromDocument;
