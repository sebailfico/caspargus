import { Server } from "http";
import { Server as IoServer, Socket } from "socket.io";
import { mongoService } from "..";

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

    socket.on("getEvents", async (callback) => {
      console.log("Received request to get events");
      socket.emit("events", await mongoService.getEvents());
    });

    socket.on("createEvent", async (msg) => {
      console.log("Received request to create event: ", msg);
      await mongoService.createEvent(msg);
      socket.emit("events", await mongoService.getEvents());
    });
  });
}
