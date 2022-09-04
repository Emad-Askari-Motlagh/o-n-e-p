import { connect } from "socket.io-client";

export async function connectToSocket() {
  return await connect("/", {
    path: "/api/socketio",
  });

  // log socket connection
}

export function sendToSocket(socket) {
  const data = [];

  socket.on("connect", () => {
    console.log("SOCKET CONNECTED!", socket.id);
  });

  // update chat on new message dispatched
  socket.on("message", (message) => {
    data.push(message);
  });

  return data;
}

export function disconnectTheSocket(socket) {
  // socket disconnet onUnmount if exists
  if (socket) return () => socket.disconnect();
}
