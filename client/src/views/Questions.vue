<template>
  <div id="app">
    <div class="d-flex justify-content-between">
      <h1>Questions</h1>
      <div>
        <router-link to="/new-question" v-if="isLoggedIn">
          <button type="button" class="btn btn-primary">Create</button>
        </router-link>
      </div>
    </div>

    <div v-if="questions.length"><QuestionsList :questions="questions" :onQuestionDelete="handleQuestionDelete" /></div>
    <div v-else>Looks like there are no questions right now</div>
  </div>
</template>

<script>
import api from '../api';
import QuestionsList from '../components/QuestionsList';

export default {
  name: 'Home',

  data() {
    return {
      questions: [],
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },

  methods: {
    async fetchAllQuestions() {
      const { data } = await api.getQuestions();
      this.questions = data.data;
    },

    handleQuestionDelete(questionId) {
      this.questions = this.questions.filter((q) => q._id !== questionId);
    },
  },

  async mounted() {
    this.fetchAllQuestions();
  },

  components: {
    QuestionsList,
  },
};
</script>

<style></style>
