<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr>
    <p v-if="socket_less">Socket connection severed. Refresh the page for new connection</p>
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">{{error}}</b-alert>
      <b-form-group id="userInputGroup"
        label="User Name"
        label-for="userInput">
        <b-form-input id="userInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required>
        </b-form-input>
      </b-form-group>
      <b-button type="submit"
        variant="primary"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid">
        Login <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'login-form',
  data() {
    return {
      userId: '',
    }
  },
  computed: {
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading
    },
    ...mapState([
      'loading',
      'error',
      'socket_less'
    ]),
    ...mapGetters([
      'hasError'
    ])
  },
  mounted() {
    window.addEventListener('beforeunload', this.unload);
  },
  methods: {
    ...mapMutations([
      'setSocket'
    ]),
    ...mapActions([
      'login'
    ]),
    async onSubmit() {
      const result = await this.login(this.userId);
      if (result) {
        this.$router.push('chat');
      }
    },
    unload(e) {
      console.log(e);
      this.setSocket(false);
      this.setLoading(false);
    }
  }
}
</script>

<style>
  .login-form {
    margin-top: 50px;
    border: 1px solid rgb(101, 219, 255);
    border-radius: 4px;
    padding: 25px;
    -webkit-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
    box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);
  }
</style>
