<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">StackOverflow</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :class="['nav-link', { active: currentPage === '/' }]" aria-current="page" to="/"
              >Questions</router-link
            >
          </li>
        </ul>
      </div>

      <div class="d-flex">
        <span v-if="isLoggedIn">
          <button @click="handleLogout" class="btn btn-link">Logout</button>
          <span style="color: #fff"> Hi, {{ user.username }}!</span>
        </span>
        <span v-else>
          <button class="btn btn-link">
            <router-link to="/signup">Register</router-link>
          </button>
          |
          <button class="btn btn-link">
            <router-link to="/login">Login</router-link>
          </button>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',

  computed: {
    ...mapGetters(['user']),

    currentPage() {
      return this.$route.path;
    },

    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout();
      this.$router.push('/login');
    },
  },
};
</script>
