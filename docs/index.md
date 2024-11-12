---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "VueDragToScroll"
  text: "A Vue composable for drag to scroll."
  tagline: "A minimal styled, configurable Vue composable to easily implement drag scroll."
  actions:
    - theme: brand
      text: Composable
      link: /composable
    - theme: alt
      text: Directive
      link: /directive
  image:
    src: /VueDragToScroll-logo-v1.svg
    alt: VueDragToScroll
---

<div class="flex gap-4">
  <div class="dark:bg-vpDark-soft bg-vpLight-soft rounded-xl w-fit p-4 px-6 mb-4">
    <label class="text-lg">VelocityMultiplier</label>
    <div class="flex gap-4 mt-2">
      <div class="bg-white/5 py-4 px-3 rounded">
        {{ velocity }}
      </div>
      <SliderRoot 
        v-model="velocityMultiplier" 
        class="relative flex items-center select-none touch-none w-[200px] h-5 mt-4"
        :max="50"
        :step="5"
      >
        <SliderTrack class="bg-vpDark-soft relative grow rounded-full h-[3px]">
          <SliderRange class="absolute bg-neutral-900 rounded-full h-full" />
        </SliderTrack>
        <SliderThumb
          class="block w-5 h-5 bg-vpDark-soft shadow-[0_2px_10px] shadow-neutral-900 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-neutral-900"
          aria-label="Velocity Multiplier"
        />
      </SliderRoot>
    </div>
  </div>

  <div class="dark:bg-vpDark-soft bg-vpLight-soft rounded-xl w-fit p-4 px-6 mb-4">
    <label class="text-lg">Friction</label>
    <div class="flex gap-4 mt-2">
      <div class="bg-white/5 py-4 px-3 rounded">
        {{ frict }}
      </div>
      <SliderRoot 
        v-model="friction" 
        class="relative flex items-center select-none touch-none w-[200px] h-5 mt-4"
        :max="1"
        :min="0.9"
        :step="0.01"
      >
        <SliderTrack class="bg-vpDark-soft relative grow rounded-full h-[3px]">
          <SliderRange class="absolute bg-neutral-900 rounded-full h-full" />
        </SliderTrack>
        <SliderThumb
          class="block w-5 h-5 bg-vpDark-soft shadow-[0_2px_10px] shadow-neutral-900 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-neutral-900"
          aria-label="Velocity Multiplier"
        />
      </SliderRoot>
    </div>
  </div>
</div>
<div ref="scrollContainer" class="scrollContainer flex gap-4">
  <div v-for="i in name" :key="i" class="scrollContainer-item dark:bg-vpDark-soft bg-vpLight-soft aspect-square rounded-xl text-8xl grid place-items-center"> {{ i }} </div>
</div>

<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from "vue";
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'radix-vue'
import { useDragToScroll } from "../lib/main";
const scrollContainer = ref(null);
const itemsShown = ref(3.5);
const name = ref("dragtoscroll")

const velocityMultiplier = ref([10]);
const friction = ref([0.95]);
const velocity = computed(() => velocityMultiplier.value[0])
const frict = computed(() => friction.value[0])

useDragToScroll(scrollContainer, {
  velocityMultiplier: velocity,
  friction: frict,
});

function calculateItemWidth(parentWidth, gap, itemCount) {
  return (parentWidth - gap * (itemCount - 1)) / itemCount;
}

function setItemWidths() {
  if (scrollContainer.value) {
    if (window.innerWidth < 600) {
      itemsShown.value = 1.5;
    } else if (window.innerWidth < 1024) {
      itemsShown.value = 2.5;
    } else {
      itemsShown.value = 3.5;
    }
    const containerWidth = scrollContainer.value.clientWidth;
    const itemWidth = calculateItemWidth(containerWidth, 16, itemsShown.value);
    scrollContainer.value.querySelectorAll(".scrollContainer-item").forEach((el) => {
      el.style.setProperty("width", `${itemWidth}px`);
      el.style.setProperty("height", `${itemWidth}px`);
    });
  }
}

onMounted(() => {
  setItemWidths();
  window.addEventListener("resize", setItemWidths);
});

onUnmounted(() => {
  window.removeEventListener("resize", setItemWidths);
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollContainer::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollContainer {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>