import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const GStore = reactive({ flashMessage: '' }) // global reactive state

createApp(App)
  .use(store)
  .use(router)
  .provide('GStore', GStore) // provides it for other components to make use of
  .mount('#app')
