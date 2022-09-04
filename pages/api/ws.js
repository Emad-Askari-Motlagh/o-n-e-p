import WebSocket, { WebSocketServer } from "ws";

import { Server } from "socket.io";
import dbInit from "@/lib/dbInit";
import Orders from "@/server/mongoSchema/orderschema";

const handler = async (req, res) => {
  try {
    console.log(
      "/api/socketio",
      "- info:",
      "Received new request from frontend!"
    );

    if (res.socket.server.io) {
      console.log("/api/socketio", "- info:", "Socket is already running!");
    } else {
      console.log("/api/socketio", "- info:", "Socket is initializing...");

      const httpServer = res.socket.server;
      const wss = new WebSocketServer({
        port: httpServer,
        path: "/api/ws",
        perMessageDeflate: {
          zlibDeflateOptions: {
            // See zlib defaults.
            chunkSize: 1024,
            memLevel: 7,
            level: 3,
          },
          zlibInflateOptions: {
            chunkSize: 10 * 1024,
          },
          // Other options settable:
          clientNoContextTakeover: true, // Defaults to negotiated value.
          serverNoContextTakeover: true, // Defaults to negotiated value.
          serverMaxWindowBits: 10, // Defaults to negotiated value.
          // Below options specified as default values.
          concurrencyLimit: 10, // Limits zlib concurrency for perf.
          threshold: 1024, // Size (in bytes) below which messages
          // should not be compressed if context takeover is disabled.
        },
      });
      console.log("/api/socketio", "- info:", "Socket server created");

      wss.on("connection", function connection(ws) {
        console.log("received: %s", data);

        ws.send("ok");
      });
      res.socket.server.io = wss;
    }
    res.end();
  } catch (err) {
    res.status(500).end();
    console.log(err);
  }
};

export default handler;
