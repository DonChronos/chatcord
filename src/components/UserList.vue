<template>
  <div class="user-list">
    <h4>Members</h4>
    <hr>
    <b-list-group>
      <b-list-group-item v-for="user in users" :key="user.username">
        {{ user.username }}
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { socket } from '../store/actions';

export default {
  name: 'user-list',
  computed: {
    ...mapState([
      'loading',
      'users',
      'activeRoom'
    ])
  },
  mounted() {
    socket.on('roomUsers', roomUsers => {
      if (this.activeRoom.name === roomUsers.room) {
        this.setUsers(roomUsers.users);
      }
    })
  },
  methods: {
    ...mapMutations([
      'setUsers'
    ])
  }
}
</script>
