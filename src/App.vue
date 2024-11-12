<script setup lang="ts">
import { useDragToScroll } from './../lib/main';
import { ref } from 'vue';

const scrollContainer = ref<HTMLElement | null>(null);

const { isDragging } = useDragToScroll(scrollContainer);
const showAlert = (i: number) => {
  alert(`${i}`);
};
</script>

<template>
  <div ref="scrollContainer" class="container">
    <div v-for="i in 20" :key="i" class="container-item" @click="!isDragging && showAlert(i)">
      {{ i }}
    </div>
  </div>
  
  <div v-drag-to-scroll class="container directive">
    <div v-for="i in 20" :key="i" class="container-item" @click="!isDragging && showAlert(i)">
      {{ i }}
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  width: 56rem;
}

.directive {
  margin-top: 2rem;
}

.container-item {
  height: 16rem;
  aspect-ratio: 1/1;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ccc;
  display: grid;
  place-items: center;
  font-size: 3rem;
  user-select: none;
}

.directive .container-item {
  background-color: #c4e89e;
  border: 1px solid #6f8559;
}
</style>
