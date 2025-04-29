<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useSocketStore } from "../stores/socketStore";

defineProps<{ msg?: string }>();

const socketStore = useSocketStore();
const eventName = ref("");
onMounted(() => {
  socketStore.getEvents();
});


function createEvent() {
  if (eventName.value.length > 0) {
    socketStore.createEvent(eventName.value);
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
      <div class="text-white  font-bold">
        {{ socketStore.liveComponent }}
      </div>




      <ul class="list bg-base-100 rounded-box shadow-md mb-6">

        <li class="p-4  text-xs opacity-60 tracking-wide flenter">
          <template v-if="socketStore.events.length > 0">
            Available Events
          </template>
          <template v-else>
            Please create an event
          </template>
        </li>

        <li class="list-row flex flex-row  " v-for="event in socketStore.events" :key="event._id">
          <!-- <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" /></div> -->
          <div class="grow">
            <div>{{ event.name }}</div>
            <div class="text-xs uppercase font-semibold opacity-60">{{ event.createdAt.toLocaleString() }}</div>
          </div>
          <button class="btn btn-square btn-ghost" @click="$router.push(`/commander/${event._id}`)">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
              </g>
            </svg>
          </button>
          <!-- <button class="btn btn-square btn-ghost">
            <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none" stroke="currentColor">
                <path
                  d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z">
                </path>
              </g>
            </svg>
          </button> -->
        </li>


      </ul>

      <div class="flenter">
        <input type="text" placeholder="Type here" class="input" v-model="eventName" />
        <button class="btn btn-primary ml-2" @click="createEvent">Create Event</button>

      </div>

      <!--       <div class="grid grid-cols-2 gap-2">
        <button class="bg-blue-500" @click="onComponentChange('L3')">L3</button>
        <button class="bg-blue-500" @click="onComponentChange('startingList')">
          Starting List
        </button>
        <button class="bg-blue-500" @click="onComponentChange('')">
          Reset
        </button>
      </div> -->
    </div>
    <!--     <div class="relative w-full aspect-video bottom-0">
      <LiveView />
    </div> -->
    <div v-if="socketStore.error" class="absolute bottom-0 left-0 w-full bg-red-500 text-white p-2 text-center">
      Error: {{ socketStore.error }}
    </div>
  </div>
</template>
