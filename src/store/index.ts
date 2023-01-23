import type { App } from 'vue'
import { createStore } from 'vuex'

const store = createStore({
  state: {
    count: 0
  },
  getters: {
    tenTimes(state) {
      return state.count * 10
    }
  },
  mutations: {
    increment(state, payload) {
      console.log('mutation increment called: payload', payload);
      state.count += payload ? payload.amount : 1
    },
    decrement(state, payload) {
      console.log('mutation decrement called: payload', payload);
      state.count -= payload ? payload.amount : 1
    }
  },
  actions: {
    incrementAsync(context, payload) {
      setTimeout(() => {
        const random = Math.random() * 1000
        if (random > 500) {
          context.commit('increment', payload)
        } else {
          context.commit('decrement', payload)
        }
      }, payload.delay)
    }
  },
  modules: {

  }
})

export default store
