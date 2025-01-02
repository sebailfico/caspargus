<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, watch } from "vue";
import { useSocketStore } from "../stores/socketStore";

defineProps<{ msg?: string }>();

const socketStore = useSocketStore();
const userComponent = ref<string>("");

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

      <!-- <input
      v-model="userComponent"
      class="w-full bg-black"
      @change="onComponentChange"
    /> -->

      <div class="grid grid-cols-2">
        <button class="btn" @click="onComponentChange('L3')">L3</button>
        <button class="btn" @click="onComponentChange('startingList')">
          Starting List
        </button>
      </div>
    </div>
  </div>
</template>
