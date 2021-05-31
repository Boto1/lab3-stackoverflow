<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Registration</h3>
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
          <button class="btn btn-primary btn-block mt-4">Signup</button>
        </div>
      </form>

      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Registration',

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
    ...mapActions(['signup']),

    async handleSubmitForm() {
      try {
        await this.signup(this.user);
        this.$router.push('/login');
      } catch (e) {
        this.error = e.message;
      }
    },
  },

  components: {},
};
</script>

<style></style>
