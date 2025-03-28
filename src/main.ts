import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './lib/firebase'
import router from './lib/router'

const app = createApp(App)
app.use(router)
app.mount('#app')
