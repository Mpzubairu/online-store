import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import timeago from 'vue-timeago3'

import './assets/style/style.css'
import './assets/style/dropdown.css'
import './assets/style/admin.css'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(timeago) // register timeago
app.mount('#app')
