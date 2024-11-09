<br />
<p align="center">
  <a href="https://github.com/unovue/radix-vue">
    <img src="./docs/assets/VueDragToScroll-logo-v1.svg" alt="Logo" width="100" />
  </a>

<h1 align="center">
VueDragToScroll
</h1>
<p align="center">
A Vue 2 & 3 composition API for drag to scroll.<br>
VueDragToScroll is a minimal styled, configurable Vue composable to easily implement drag scroll.
<p>

<p align="center">
</a>
<a href="https://www.npmjs.com/package/vue-dragtoscroll" target="__blank"><img src="https://img.shields.io/npm/v/vue-dragtoscroll?style=flat&colorA=002438&colorB=41c399" alt="NPM version"></a>
<a href="https://www.npmjs.com/package/vue-dragtoscroll" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/vue-dragtoscroll?flat&colorA=002438&colorB=41c399"></a>
</p>

## Installation
```bash
yarn add vue-dragtoscroll
```

## How to use

Just import the composable:
```jsx
<script setup>
import useDragToScroll from "vue-dragtoscroll"
</script>
```
Add your ref:
```jsx
<script setup>
import useDragToScroll from "vue-dragtoscroll"
const yourScrollContainer = ref(null)
</script>
```
And run the composable:
```jsx
<script setup>
import useDragToScroll from "vue-dragtoscroll"
const yourScrollContainer = ref(null)
const { isDragging } = useDragToScroll(yourScrollContainer)
</script>
```

## Contributing

I would love to have your contributions! All PRs all welcomed!

## Authors

- [Melvin Idema](https://github.com/melvinidema)

## Credits
All credits go to these open-source works and resources
- [vue-demi](https://github.com/vueuse/vue-demi)