import io from "socket.io-client";

const socket = io(process.env.SERVER_LINK, {
  transports: ["websocket"],
  path: "/hello",
});

export default socket;
