<script setup lang="ts">
import { useSocketStore } from "../stores/socketStore";
import LiveView from "./LiveView.vue";

defineProps<{ msg?: string }>();

const socketStore = useSocketStore();

function onComponentChange(cmp: string) {
  socketStore.sendLiveComponent(cmp);
}
</script>

<template>
  <div class="absolute top-0 left-0 size-full bg-slate-600 text-white pt-4">
    <div class="relative h-40 w-1/2 left-1/2 -translate-x-1/2">
      COMMANDER <br />
      {{ socketStore.liveComponent }}

      <div class="grid grid-cols-2 gap-2">
        <button class="bg-blue-500" @click="onComponentChange('L3')">L3</button>
        <button class="bg-blue-500" @click="onComponentChange('startingList')">
          Starting List
        </button>
        <button class="bg-blue-500" @click="onComponentChange('')">
          Reset
        </button>
      </div>
    </div>
    <div class="relative w-full aspect-video bottom-0">
      <LiveView />
    </div>
  </div>
</template>
