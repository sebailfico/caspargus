import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICaspargusEventSummary } from "../models/ICaspargusEventSummary";
import { useSocketStore } from "./socketStore";

export interface ISocketResponse<T> {
  result: T;
}
// Store for managing event summaries and events
export const useEventStore = defineStore("event", () => {
  // STATE
  const eventsSummaries = ref<ICaspargusEventSummary[]>([]);
  const store = useSocketStore();

  // GETTERS

  // ACTIONS
  function getEventSummaries() {
    store.socket.emit("getEventSummaries");
  }

  function createEventSummary(name: string) {
    store.socket.emit("createEvent", name);
  }

  // WATCHERS
  store.socket.on("eventSummaries", (data: ICaspargusEventSummary[]) => {
    console.log("Got events", data);
    eventsSummaries.value = data;
  });

  return {
    // STATE
    eventsSummaries,
    //ACTIONS
    createEventSummary,
    getEventSummaries,
  };
});
