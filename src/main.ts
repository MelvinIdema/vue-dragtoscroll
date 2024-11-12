import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { dragToScroll } from '../lib/directive'

const app = createApp(App)
app.directive('drag-to-scroll', dragToScroll)
app.mount('#app')

