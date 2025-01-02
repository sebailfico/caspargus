<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { Skiffer } from "../models/skiffer";

defineProps<{ msg?: string }>();
const skiffers = ref<Skiffer[]>([]);

const skiffersTmp: Skiffer[] = [
  {
    ReportType: "Last Arrival",
    Contest: "Last Arrival",
    StageID: "",
    Rank: 1,
    Bib: "8",
    Lastname: "TALAJA",
    Firstname: "Ivan",
    Nation: "CRO",
    TeamCode: "MU23",
    TeamName: "CROATIA",
    UCICode: "4149655",
    Time: "41:49:655",
    Gap: "00:00:00",
    Bonus: "",
    ResultsFinal: "",
  },
  {
    ReportType: "Last Arrival",
    Contest: "Last Arrival",
    StageID: "",
    Rank: 2,
    Bib: "4",
    Lastname: "BORGONOVO",
    Firstname: "Giovanni",
    Nation: "ITA",
    TeamCode: "MU23",
    TeamName: "GAVIRATE",
    UCICode: "4153716",
    Time: "41:53:716",
    Gap: "00:00:00",
    Bonus: "",
    ResultsFinal: "",
  },
  {
    ReportType: "Last Arrival",
    Contest: "Last Arrival",
    StageID: "",
    Rank: 3,
    Bib: "11",
    Lastname: "GARDINO",
    Firstname: "Alessandro",
    Nation: "ITA",
    TeamCode: "MU23",
    TeamName: "ARMIDA SC",
    UCICode: "4214016",
    Time: "42:14:016",
    Gap: "00:00:00",
    Bonus: "",
    ResultsFinal: "",
  },
];

onMounted(() => {
  setTimeout(async () => {
    for (let i = 0; i < 10 && i < skiffersTmp.length; i++) {
      skiffers.value.push(skiffersTmp[i]);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }, 10);
});

// onMounted(() => {
//   axios
//     .get(
//       "http://seba.com:6969/dataProxy?src=https://amministrazione.silverskiff.org/ApiStreaming/getCategoryRanking/MU23"
//     )
//     .then((res) => {
//       debugger;
//       console.log(res.data);
//       skiffers.value = res.data;
//     });
// });
</script>

<template>
  <div
    class="absolute top-0 h-full left-1/2 -translate-x-1/2 w-[50%] elev-4 flenter overflow-hidden"
  >
    <div class="grid grid-cols-1 gap-4 w-full">
      <div
        v-for="(sk, index) in skiffersTmp"
        v-bind:key="sk.UCICode"
        class="h-[6rem] w-full pl-4"
      >
        <div
          v-if="skiffers[index]"
          class="flenter size-full text-4xl weight-700 text-white rounded-t bg-indigo-950 bg-gradient-to-r from-indigo-500 vertical-animation"
        >
          {{ sk.Rank }}. {{ sk.Lastname }} {{ sk.Firstname }} ({{ sk.Nation }})
        </div>
      </div>
    </div>

    <!-- <div
      class="grid grid-cols-1 gap-4 w-full"
      :class="`h-[${(7 + 1 + 1) * skiffersTmp.length}rem]`"
    >
      <div
        v-for="sk in skiffers"
        v-bind:key="sk.UCICode"
        class="h-[7rem] w-full flefter pl-4 text-4xl weight-700 text-white rounded-t bg-indigo-950 bg-gradient-to-r from-indigo-500 vertical-animation"
      >
        {{ sk.Rank }}. {{ sk.Lastname }} {{ sk.Firstname }} ({{ sk.Nation }})
      </div>
    </div> -->
  </div>
</template>
