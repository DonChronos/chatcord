import io from 'socket.io-client';
export const socket = io('http://localhost:3000');
const rooms = ['HTML', 'CSS', 'JAVASCRIPT'];

function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit('setError', message);
}

export default {
  async login({ commit, state }, userId) {
    try {
      commit('setError', '');
      commit('setLoading', true);
      commit('setUser', userId)
      commit('setReconnect', false);
      commit('setRooms', rooms);
      const activeRoom = state.activeRoom || rooms[0];
      commit('setActiveRoom', activeRoom);
      socket.emit('joinRoom', { userId, activeRoom });
      console.log(state.user);
      console.log(userId);
      return true;
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
      socket.emit('chatMessage', message);
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
