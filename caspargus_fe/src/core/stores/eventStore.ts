import { defineStore } from "pinia";
import { ref } from "vue";
import type { ICaspargusEventSummary, ICaspargusEvent } from "../models/ICaspargusEventSummary";
import { useSocketStore } from "./socketStore";

export interface ISocketResponse<T> {
  result: T;
}
// Store for managing event summaries and events
export const useEventStore = defineStore("event", () => {
  // STATE
  const eventsSummaries = ref<ICaspargusEventSummary[]>([]);
  const currentEvent = ref<ICaspargusEvent | null>(null);
  const store = useSocketStore();

  // GETTERS

  // ACTIONS
  function getEventSummaries() {
    store.socket.emit("getEventSummaries");
  }

  function getEvent(id: string) {
    store.socket.emit("getEvent", id);
  }

  function createEventSummary(name: string) {
    store.socket.emit("createEvent", name);
  }

  function updateEvent(event: ICaspargusEvent) {
    store.socket.emit("updateEvent", event);
  }

  // WATCHERS
  store.socket.on("eventSummaries", (data: ICaspargusEventSummary[]) => {
    console.log("Got events", data);
    eventsSummaries.value = data;
  });

  store.socket.on("event", (data: ICaspargusEvent) => {
    console.log("Got event", data);
    currentEvent.value = data;
  });

  return {
    // STATE
    eventsSummaries,
    currentEvent,
    //ACTIONS
    createEventSummary,
    getEventSummaries,
    getEvent,
    updateEvent,
  };
});
