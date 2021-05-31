<template>
  <div>
    <div class="card-body">
      <h5 class="card-title">{{ question.heading }}</h5>
      <p class="card-text">
        {{ question.description }}
      </p>
      <span>Answers:</span>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="answer in question.answers" :key="answer._id">
          <span style="color: grey">
            {{ humanizeDate(answer.createdAt) }}
            |
            {{ answer.user.username }}
          </span>
          -
          {{ answer.text }}

          <button
            type="button"
            class="btn"
            aria-label="Close"
            v-if="user._id === answer.user._id"
            @click="deleteAnswer(answer._id)"
          >
            <span aria-hidden="true" style="font-size: 20px">&times;</span>
          </button>
        </li>
      </ul>

      <div v-if="isAuthenticated">
        <hr />
        <form @submit.prevent="postAnswer(question._id)" class="mt-4">
          <div class="form-group">
            <label>Type your answer</label>
            <input type="text" class="form-control" v-model="answer.text" required />
          </div>

          <div class="d-flex justify-content-between">
            <div class="form-group">
              <button type="submit" class="btn btn-outline-primary btn-block mt-4">Submit</button>
            </div>
            <div v-if="user._id === question.user._id" class="d-flex mt-4">
              <router-link class="form-group" :to="{ name: 'questions/edit', params: { questionId: question._id } }">
                <button class="btn btn-outline-info btn-block">Edit</button>
              </router-link>
              <div class="form-group ms-2">
                <button type="button" @click="deleteQuestion" class="btn btn-outline-danger btn-block">Delete</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../api';

export default {
  name: 'QuestionsList',

  props: ['question', 'onQuestionDelete'],

  data() {
    return {
      answer: { text: '' },
    };
  },

  computed: {
    ...mapGetters(['user', 'isAuthenticated']),
  },

  methods: {
    async postAnswer(questionId) {
      const { data } = await api.createAnswer({ ...this.answer, questionId });
      this.question.answers.push(data.data);
    },

    async deleteQuestion() {
      await api.deleteQuestion(this.question._id);
      this.onQuestionDelete(this.question._id);
    },

    async deleteAnswer(answerId) {
      await api.deleteAnswer(answerId);
      this.question.answers = this.question.answers.filter((a) => a._id !== answerId);
    },

    humanizeDate(date) {
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
      };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    },
  },

  components: {},
};
</script>

<style></style>
