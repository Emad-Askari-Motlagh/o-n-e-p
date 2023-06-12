import React, { useEffect, useState } from "react";
import { io, Manager, connect } from "socket.io-client";

export default function useSocketIo(path) {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState([]);
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    // connect to socket server
    const socket = connect("/", {
      reconnection: true, // Enable reconnection attempts
      reconnectionAttempts: 5, // Number of reconnection attempts
      reconnectionDelay: 1000, // Delay between reconnection attempts in milliseconds
      reconnectionDelayMax: 5000, // Maximum delay between reconnection attempts
      path,
    });

    // log socket connection
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
      setConnected(true);
    });

    // update chat on new message dispatched
    socket.on("message", (message: []) => {
      setData([...message]);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, [path]);
  return { data, connected };
}
