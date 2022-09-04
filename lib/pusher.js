import Pusher from "pusher";

export const pusher = new Pusher({
  appId: "1465009",
  key: "ce9c4185dc0cc15e2fbe",
  secret: "ab7066c47e7cc6f4afb9",
  cluster: "eu",

  // useTLS: true,
  keepAlive: true,
});
