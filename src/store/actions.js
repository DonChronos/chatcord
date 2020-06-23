import io from 'socket.io-client';
const socket = io('http://localhost:3000');

function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      // connect to socket.io
      commit('setUser', userId)
      console.log(state.user);
      console.log(userId);
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit('setLoading', false);
    }
  },
  async sendMessage ({ commit }, message) {
    try {
      commit('setError', '');
      commit('setSending', true);
      // send message via socketio
      socket.emit(message);
      return message;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit('setSending', false);
    }
  },
  async logout({ commit }) {
    commit('reset');
    // socketio disconnect
    socket.close();
    window.localStorage.clear();
  }
}
