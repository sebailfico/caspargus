<script setup lang="ts">
import { useSocketStore } from "../stores/socketStore";

defineProps<{ id: string }>();

const socketStore = useSocketStore();

function onComponentChange(cmp: string) {
  socketStore.sendLiveComponent(cmp);
}
</script>

<template>
  <div class="absolute top-0 left-0 size-full bg-slate-600 text-white pt-4">
    <div class="relative h-40 w-1/2 left-1/2 -translate-x-1/2">

      <div class="text-white text-2xl font-bold">COMMANDER
      </div>
      <br />
      <div class="text-white  font-bold">
        Now showing: {{ socketStore.liveComponent != "" ? socketStore.liveComponent : "None" }}
      </div>

      <div class="grid grid-cols- gap-2">
        <button class="bg-blue-500" @click="onComponentChange('L3')">L3</button>
        <button class="bg-blue-500" @click="onComponentChange('startingList')">
          Starting List
        </button>
        <!-- <button class="bg-blue-500" @click="onComponentChange('')">
          Reset
        </button> -->
      </div>


      <details class="dropdown mt-2">
        <summary class="btn m-1">Add item</summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>
      </details>
    </div>


    <!-- <div class="relative w-full aspect-video bottom-0">
      <LiveView />
    </div> -->
    <div v-if="socketStore.error" class="absolute bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
      Error: {{ socketStore.error }}
    </div>
  </div>
</template>
