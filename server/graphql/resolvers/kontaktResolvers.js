import { Server } from "socket.io";

const kontaktResolvers = {
  Mutation: {
    async connectToSocket(_, __, { res }) {
      if (res.socket.server.io) {
        console.log("Socket is already running");
      } else {
        console.log("Socket is initializing");
        const io = new Server(res.socket.server, {
          cors: { origin: "*" },
          path: "/socket.io",
        });
        res.socket.server.io = io;
      }
      // io.on("connection", (socket) => {
      //   console.log("New User connected");
      //   socket.on("onTextChange", (data) => {
      //     // console.log(`Message from client: ${data.text}, whoose id is: ${data.from}`);
      //     io.emit("on-text-change", data);
      //   });
      //   socket.on("disconnect", () => {
      //     console.log("User disconnected");
      //   });
      // });
      return "done";
    },
    async emitSocket(parent, __, { res }) {
      if (!res.socket.server.io) {
        return null;
      }
      console.log(parent, res.socket.server.io);
      const io = res.socket.server.io;
      io.on("connection", (socket) => {
        console.log("New User connected");
        socket.on("onTextChange", (data) => {
          // console.log(`Message from client: ${data.text}, whoose id is: ${data.from}`);
          io.emit("on-text-change", data);
        });
        socket.on("disconnect", () => {
          console.log("User disconnected");
        });
      });
      return { id: "emad socket" };
    },
  },
};

export default kontaktResolvers;
