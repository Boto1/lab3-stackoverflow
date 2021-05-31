<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import { mapActions } from 'vuex';

export default {
  name: 'App',

  computed: {
    currentPage() {
      return this.$route.path;
    },
  },

  methods: {
    ...mapActions(['getCurrentUser']),
  },

  mounted() {
    this.getCurrentUser();
  },

  components: {
    Navbar,
  },
};
</script>
