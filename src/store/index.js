import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    loading: false,
    sending: false,
    error: null,
    user: [],
    reconnect: false,
    activeRoom: null,
    rooms: [],
    users: [],
    messages: [],
    socket_less: false,
  },
  mutations,
  actions,
  getters: {

  },
  plugins: [vuexLocal.plugin],
  strict: debug,
})
