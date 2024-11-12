# Directive

Since v1.1 VueDragToScroll introduced the v-directive: an incredibly straightforward way to implement
drag to scroll to your components. The downside: it's not configurable. The upside: it's plug-and-play!

This means that it's recommended to not use any events inside the scroll container as they will be fired on every drag stop. See this effect when starting your drag on box 3:

## Demo
<script setup>
import { ref } from "vue";
import { dragToScroll } from "vue-dragtoscroll";
const vDragToScroll = dragToScroll;

const showAlert = (i) => i === 3 && alert(i);
</script>

<div v-drag-to-scroll class="container">
  <div v-for="i in 20" :key="i" class="container-item" @click="showAlert(i)">
    {{ i === 3 ? '3 will fire' : i }}
  </div>
</div>

## Usage
```vue
<script setup>
import { dragToScroll } from "vue-dragtoscroll";
const vDragToScroll = dragToScroll;

const showAlert = (i) => i === 3 && alert(i);
</script>

<template>
  <div v-drag-to-scroll class="container">
    <div v-for="i in 20" :key="i" class="container-item" @click="showAlert(i)">
      {{ i === 3 ? '3 will fire' : i }}
    </div>
  </div>
</template>
```

<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
}

.directive {
  margin-top: 2rem;
}

.container-item {
  height: 16rem;
  aspect-ratio: 1/1;
  background-color: rgba(240, 240, 240, .5);
  color: rgba(31, 31, 31, .3);
  margin-right: 1rem;
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