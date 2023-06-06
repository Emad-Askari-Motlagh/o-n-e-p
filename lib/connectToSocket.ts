import { Socket, connect } from "socket.io-client";

export async function connectToSocket(): Promise<Socket> {
  return await connect("/", {
    path: "/api/socketio",
  });
}

export function sendToSocket(socket: Socket): any[] {
  const data: any[] = [];

  socket.on("connect", () => {
    console.log("SOCKET CONNECTED!", socket.id);
  });

  socket.on("message", (message: any) => {
    data.push(message);
  });

  return data;
}

export function disconnectTheSocket(socket: Socket): () => void {
  if (socket) {
    return () => socket.disconnect();
  }
  return () => {};
}
