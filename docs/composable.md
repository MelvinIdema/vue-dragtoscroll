# Composable

The composable enables you to configure the drag to scroll behavior to your own likings. The composable also exposes the `isDragging` ref so you can use this ref in your events and make sure click events only trigger when the user is not dragging. 

## Demo
<script setup>
import { ref } from "vue";
import { useDragToScroll } from "../lib/main";
const scrollContainer = ref(null);
const { isDragging } = useDragToScroll(scrollContainer);

const showAlert = (i) => alert(i);
</script>

<div ref="scrollContainer" class="container">
  <div v-for="i in 20" :key="i" class="container-item" @click="!isDragging && showAlert(i)">
    {{ i }}
  </div>
</div>

## Usage
```vue
<script setup>
import { useDragToScroll } from "vue-dragtoscroll";
const scrollContainer = ref(null);
const { isDragging } = useDragToScroll(scrollContainer);

const showAlert = (i) => alert(i);
</script>

<template>
  <div ref="scrollContainer">
    <div v-for="i in 20" :key="i" @click="!isDragging && showAlert(i)">
      {{ i }}
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