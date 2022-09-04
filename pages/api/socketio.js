import { Server } from "socket.io";
import dbInit from "@/lib/dbInit";
import Orders from "@/server/mongoSchema/orderschema";

const handler = async (req, res) => {
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
    const io = new Server(httpServer, {
      path: "/api/socketio",
    });
    console.log("/api/socketio", "- info:", "Socket server created");

    io.on("connection", async (socket) => {
      console.log("connected");
      // socket.broadcast.emit("a user connected");
      socket.on("getOrders", (msg) => {
        Orders.watch().on("change", async () => {
          console.log("here");
          const orders = await Orders.find({})
            .populate("product")
            .populate("costumer");
          io.emit("orders", JSON.stringify(orders));
        });
      });
    });
    res.socket.server.io = io;
  }

  res.end();
  try {
  } catch (err) {
    res.status(500).json(res);
    console.log(err);
  }
};

export default handler;
