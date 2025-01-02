<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

defineProps<{ msg: string }>();
</script>

<template>
  <div
    class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-indigo-950 h-20 w-[50%] rounded-t bg-gradient-to-r from-indigo-500 elev-4"
  >
    <div class="absolute size-full flefter pl-4 text-4xl weight-700 text-white">
      GAZZILLE MIAO MIAO 9000
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
