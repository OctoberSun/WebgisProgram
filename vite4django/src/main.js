// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.mount('#app')
