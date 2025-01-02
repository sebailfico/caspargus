<script setup lang="ts">
import { useSocketStore } from "../stores/socketStore";

defineProps<{ msg?: string }>();

const socketStore = useSocketStore();

function onComponentChange(cmp: string) {
  socketStore.sendLiveComponent(cmp);
}
</script>

<template>
  <div
    class="absolute top-0 h-full left-1/2 -translate-x-1/2 w-[50%] elev-4 flenter text-white"
  >
    <div>
      COMMANDER <br />
      {{ socketStore.liveComponent }}

      <div class="grid grid-cols-2 gap-2">
        <button class="btn" @click="onComponentChange('L3')">L3</button>
        <button class="btn" @click="onComponentChange('startingList')">
          Starting List
        </button>
        <button class="btn" @click="onComponentChange('')">
          Reset
        </button>
      </div>
    </div>
  </div>
</template>
