<script setup lang="ts">
import { onMounted } from "vue";
import { useSocketStore } from "../stores/socketStore";
import { useEventStore } from "../stores/eventStore";
import type { ICaspargusEventGraphic } from "../models/ICaspargusEventSummary";

const props = defineProps<{ id: string }>();

const socketStore = useSocketStore();
const eventStore = useEventStore();

const availableComponents = ["L3", "startingList"];

onMounted(() => {
  eventStore.getEvent(props.id);
});

function onComponentChange(cmp: string) {
  socketStore.sendLiveComponent(cmp);
}

function addGraphic(name: string) {
  if (!eventStore.currentEvent) return;

  const newGraphic: ICaspargusEventGraphic = {
    name,
    config: {}
  };

  const updatedEvent = {
    ...eventStore.currentEvent,
    graphics: [...eventStore.currentEvent.graphics, newGraphic]
  };

  eventStore.updateEvent(updatedEvent);
}
</script>

<template>
  <div class="absolute top-0 left-0 size-full bg-slate-600  pt-4">
    <div class="relative h-40 w-1/2 left-1/2 -translate-x-1/2">
      <div class="text-white text-2xl font-bold">Configurator</div>
      <br />

      <!-- <div class="grid grid-cols- gap-2">
        <button class="bg-blue-500" @click="onComponentChange('L3')">L3</button>
        <button class="bg-blue-500" @click="onComponentChange('startingList')">
          Starting List
        </button>
      </div> -->

      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Graphics Playlist</li>

        <li v-for="graphic in eventStore.currentEvent?.graphics" :key="graphic.name" class="list-row">
          <button class="btn btn-ghost w-full justify-start" @click="onComponentChange(graphic.name)">
            <div class="flex items-center gap-4">
              <div class="size-10 rounded-box bg-primary flex items-center justify-center">
                <span class="text-white font-bold">{{ graphic.name.charAt(0) }}</span>
              </div>
              <div>
                <div class="font-semibold">{{ graphic.name }}</div>
                <div class="text-xs uppercase font-semibold opacity-60">Click to show</div>
              </div>
            </div>
          </button>
        </li>
      </ul>

      <!-- <div class="mt-4">
        <h3 class="text-lg font-bold mb-2">Event Graphics</h3>
        <ul class="list-disc pl-4">
          <li v-for="graphic in eventStore.currentEvent?.graphics" :key="graphic.name">
            {{ graphic.name }}
          </li>
        </ul>
      </div> -->

      <details class="dropdown mt-2">
        <summary class="btn m-1">Add graphic</summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li v-for="component in availableComponents" :key="component">
            <a @click="addGraphic(component)">{{ component }}</a>
          </li>
        </ul>
      </details>
    </div>

    <div v-if="socketStore.error" class="absolute bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
      Error: {{ socketStore.error }}
    </div>
  </div>
</template>
