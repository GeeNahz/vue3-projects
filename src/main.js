import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GStore from './store'
import 'nprogress/nprogress.css'

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore) // provides it for other components to make use of
  .mount('#app')
