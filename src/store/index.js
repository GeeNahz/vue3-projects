import { reactive } from 'vue'
import { createStore } from 'vuex'
import EventService from '@/services/EventService.js'

export default createStore({
  state: {
    user: 'Nero Aqua',
    events: [],
    totalEvents: 0
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createEvent({ commit }, event) {
      EventService.postEvent(event)
        .then(() => {
          commit('ADD_EVENT', event)
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchEvents({ commit }, routeTo, next) {
      EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
        .then(response => {
          commit('SET_EVENTS', response.data)
          next(comp => {
            comp.events = response.data
            comp.totalEvents = response.headers['x-total-count']
          })
        })
        .catch(() => {
          next({ name: 'NetworkError' })
        })
    }
  },
  modules: {}
})

export const GStore = reactive({ flashMessage: '', event: null }) // global reactive state
