import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref } from "vue";
import type { ICaspargusEventSummary } from "../models/ICaspargusEventSummary";

export interface ISocketResponse<T> {
  result: T;
}

export const useSocketStore = defineStore("socket", () => {
  // STATE
  const liveComponent = ref("");
  const socket = io("http://localhost:6969");
  const error = ref("");

  // GETTERS

  // ACTIONS
  function sendLiveComponent(cmp: string) {
    socket.emit("live", cmp);
  }

  // WATCHERS

  socket.on("live", (data) => {
    if (data === liveComponent.value) return;
    liveComponent.value = data;
  });

  socket.on("connect_error", (errorMessage: Error) => {
    console.error("Socket error:", errorMessage);
    error.value = errorMessage.message;
  });

  socket.on("connect", () => {
    console.log("Connected to server");
    error.value = "";
  });

  return {
    // STATE
    socket,
    liveComponent,
    error,
    //ACTIONS
    sendLiveComponent,
  };
});
