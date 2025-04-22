import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref } from "vue";
import type { ICaspargusEvent } from "../models/caspargusEvent";

export interface ISocketResponse<T> {
  result: T;
}

export const useSocketStore = defineStore("socket", () => {
  // STATE
  const liveComponent = ref("");
  const events = ref<ICaspargusEvent[]>([]);
  const socket = io("http://localhost:6969");

  // GETTERS

  // ACTIONS
  function sendLiveComponent(cmp: string) {
    socket.emit("live", cmp);
  }

  function getEvents() {
    socket.emit("getEvents");
  }

  function createEvent(name: string) {
    socket.emit("createEvent", name);
  }

  // WATCHERS

  socket.on("events", (data: ICaspargusEvent[]) => {
    console.log("Got events", data);
    events.value = data;
  });

  socket.on("live", (data) => {
    if (data === liveComponent.value) return;
    liveComponent.value = data;
  });

  return {
    // STATE
    liveComponent,
    events,
    //ACTIONS
    createEvent,
    getEvents,
    sendLiveComponent,
  };
});
