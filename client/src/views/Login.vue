<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Login</h3>

      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>

      <form @submit.prevent="handleSubmitForm" class="mt-5">
        <div class="form-group">
          <label>Username</label>
          <input type="text" class="form-control" v-model="user.username" required />
        </div>

        <div class="form-group mt-4">
          <label>Password</label>
          <input type="password" class="form-control" v-model="user.password" required />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block mt-4">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Login',

  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      error: '',
    };
  },

  methods: {
    ...mapActions(['login']),

    async handleSubmitForm() {
      try {
        await this.login(this.user);
        this.$router.push('/');
      } catch (e) {
        this.error = e.message;
      }
    },
  },

  components: {},
};
</script>

<style></style>
