<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Chatcord
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user }} | </b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'ChatNavBar',
  computed: {
    ...mapState([
      'user',
      'reconnect'
    ])
  },
  mounted() {
    window.addEventListener('beforeunload', this.unload);
    if (this.reconnect) {
      this.login(this.user);
    }
  },
  methods: {
    ...mapMutations([
      'setReconnect',
      'setSocket',
      'setLoading'
    ]),
    ...mapActions([
      'logout',
      'login'
    ]),
    onLogout() {
      this.$router.push({ path: '/' });
      this.logout();
      this.setSocket(true);
      this.setLoading(true);
    },
    unload(e) {
      console.log(e);
      if (this.user) {
        this.setReconnect(true);
      }
    }
  }
}
</script>

<style>
  #chat-navbar {
    margin-bottom: 15px;
  }
</style>
