import Vue from 'vue';
import Vuex from 'vuex';

//Store Functionalities
import actions from './actions'
import getters from './getters'
// import modules from './modules'
import mutations from './mutations'
import state from './state'

Vue.use(Vuex);


export const store = new Vuex.Store({
  actions,
  getters,
  mutations,
  state
})

export default store
