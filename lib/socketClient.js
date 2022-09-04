import io from "socket.io-client";

let socket = io(process.env.SERVER_LINK, {
  transports: ["websocket"],
  path: "/hello",
});

export default socket;
