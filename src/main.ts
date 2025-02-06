import '@/assets/style/tailwindcss.scss'
import 'vant/lib/index.css'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './stores'
import { useVant } from '@/plugins/vant'
import { registerGlobalComponent } from '@/components'

const app = createApp(App)

registerGlobalComponent(app)
app.use(router)
app.use(store)
registerGlobalComponent(app)
useVant(app)

app.mount('#app')
