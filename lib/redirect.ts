import Router from "next/router";

const redirect = (res: any, target: string) => {
  if (res) {
    res.writeHead(303, { Location: target });
    res.end();
  } else {
    Router.replace(target);
  }
};

export default redirect;
