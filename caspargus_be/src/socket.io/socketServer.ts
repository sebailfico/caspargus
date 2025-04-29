import { Server } from "http";
import { Server as IoServer, Socket } from "socket.io";
import { eventSummaryService, eventService } from "..";

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

    // Event Summaries
    socket.on("getEventSummaries", async (callback) => {
      console.log("Received request to get event summaries");
      socket.emit(
        "eventSummaries",
        await eventSummaryService.getEventSummaries()
      );
    });

    socket.on("createEvent", async (msg) => {
      console.log("Received request to create event summary: ", msg);
      const eventSummary = await eventSummaryService.createEventSummary(msg);

      await eventService.createEvent(eventSummary);

      socket.emit(
        "eventSummaries",
        await eventSummaryService.getEventSummaries()
      );
    });

    // Events
    // socket.on("getEvents", async (callback) => {
    //   console.log("Received request to get events");
    //   socket.emit("events", await eventService.getEvents());
    // });
    socket.on("getEvent", async (msg) => {
      console.log("Received request to get event: ", msg);
      socket.emit("event", await eventService.getEventById(msg));
    });

    socket.on("updateEvent", async (msg) => {
      console.log("Received request to update event: ", msg);
      await eventService.updateEvent(msg._id, msg);
      socket.emit("event", await eventService.getEventById(msg._id));
    });

    // socket.on("createEvent", async (msg) => {
    //   console.log("Received request to create event: ", msg);
    //   await eventService.createEvent(msg);
    //   socket.emit("events", await eventService.getEvents());
    // });
  });
}
