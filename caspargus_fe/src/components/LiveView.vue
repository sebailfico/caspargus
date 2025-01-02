<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

defineProps<{ msg: string }>();



</script>

<template>
  <div
    class="absolute top-0 h-full left-1/2 -translate-x-1/2 w-[50%] elev-4 flenter text-white"
  >
    ASSOLUTAMENTE NON TRIVIALE
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
