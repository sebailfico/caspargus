import { defineStore } from "pinia";
import { io } from "socket.io-client";
import { ref, watch } from "vue";

export const useSocketStore = defineStore("socket", () => {
  // STATE
  const liveComponent = ref("");
  const socket = io("http://localhost:6969");
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

  return { liveComponent, sendLiveComponent };
});
