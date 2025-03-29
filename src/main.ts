import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './lib/firebase'
import { router } from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { setDefaultAxios } from './lib/axios'

const app = createApp(App)

// Initialize axios
setDefaultAxios()

// Initialize router
app.use(router)

// Initialize Vue Query
app.use(VueQueryPlugin)
app.mount('#app')
