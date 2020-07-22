import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import jokes from './modules/jokes'

export default new Vuex.Store({
  modules: {
    strict: true,
    jokes
  }
})
