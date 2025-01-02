import { Server } from "http";
import { Server as IoServer } from "socket.io";

// const io = new IoServer(Server);

let liveComponent = "";

export function useSocketIoServer(server: Server) {
  const io = new IoServer(server, {
    cors: {
      origin: "*",
    },
  });
  io.on("connection", (socket) => {
    io.emit("live", liveComponent);

    socket.on("live", (msg) => {
      console.log("Received request to update live component: ", msg);
      liveComponent = msg;
      io.emit("live", msg);
    });
  });
}
