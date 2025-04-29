<script setup lang="ts">
import LowerThird from "../../components/LowerThird.vue";
import StartingList from "../../components/StartingList.vue";
import { useSocketStore } from "../stores/socketStore";

defineProps<{ msg?: string }>();

const socketStore = useSocketStore();
</script>

<template>
  <LowerThird v-if="socketStore.liveComponent === 'L3'" />

  <StartingList v-if="socketStore.liveComponent === 'startingList'" />

  <!-- <div
    class="absolute top-0 h-full left-1/2 -translate-x-1/2 w-[50%] elev-4 flenter text-white"
  >
    ASSOLUTAMENTE NON TRIVIALE <br />
    {{ socketStore.liveComponent }}
  </div> -->
</template>
