import { reactive } from "vue"
import { createStore } from 'vuex'

export default createStore({
    state: {
        user: 'Nero Aqua',
        events: []
    },
    mutations: {
        ADD_EVENT(state, event) {
            state.events.push(event)
        }
    },
    actions: {},
    modules: {}
})

export const GStore = reactive({ flashMessage: '', event: null }) // global reactive state
