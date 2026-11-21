import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'
import './style.css'
// Load sync modules up front so signing in on any page moves this device's
// progress into the account.
import './lib/progress.js'
import './lib/missed.js'
import './lib/marked.js'

createApp(App).use(router).mount('#app')
