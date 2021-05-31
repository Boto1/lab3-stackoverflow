<template>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h3 class="text-center">Create Question</h3>
      <form @submit.prevent="handleSubmitForm" class="mt-5">
        <div class="form-group">
          <label>Heading</label>
          <input type="text" class="form-control" v-model="question.heading" required />
        </div>

        <div class="form-group mt-4">
          <label>Description</label>
          <input type="text" class="form-control" v-model="question.description" required />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block mt-4">Create</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'CreateQuestion',

  data() {
    return {
      question: {
        heading: '',
        description: '',
      },
    };
  },

  methods: {
    async handleSubmitForm() {
      await api.createQuestion(this.question);
      this.$router.push('/');
    },
  },

  components: {},
};
</script>

<style></style>
