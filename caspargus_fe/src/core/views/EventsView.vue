<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEventStore } from "../stores/eventStore";
import { useSocketStore } from "../stores/socketStore";

const socketStore = useSocketStore();
const eventStore = useEventStore();
const eventName = ref("");
onMounted(() => {
  eventStore.getEventSummaries();
});


function createEventSummary() {
  if (eventName.value.length > 0) {
    eventStore.createEventSummary(eventName.value);
    eventName.value = "";
  }
}
</script>

<template>
  <div class="absolute top-0 left-0 size-full bg-slate-600  pt-4">
    <div class="relative h-40 w-1/2 left-1/2 -translate-x-1/2">
      <div class="text-white text-2xl font-bold">EVENTS
      </div>
      <br />

      <ul class="list bg-base-100 rounded-box shadow-md mb-6">

        <li class="p-4  text-xs opacity-60 tracking-wide flenter">
          <template v-if="eventStore.eventsSummaries.length > 0">
            Available Events
          </template>
          <template v-else>
            Please create an event
          </template>
        </li>

        <li class="list-row flex flex-row  " v-for="event in eventStore.eventsSummaries" :key="event._id">
          <div class="grow">
            <div>{{ event.name }}</div>
            <div class="text-xs uppercase font-semibold opacity-60">{{ event.createdAt.toLocaleString() }}</div>
          </div>
          <button class="btn btn-square btn-ghost" @click="$router.push(`/configurator/${event._id}`)">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
        </li>
      </ul>

      <div class="flenter">
        <input type="text" placeholder="Type here" class="input" v-model="eventName" />
        <button class="btn btn-primary ml-2" @click="createEventSummary">Create Event</button>
      </div>
    </div>

    <div v-if="socketStore.error" class="absolute bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
      Error: {{ socketStore.error }}
    </div>
  </div>
</template>
