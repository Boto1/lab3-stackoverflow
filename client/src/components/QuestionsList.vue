<template>
  <div>
    <div class="card mt-4" v-for="question in questions" :key="question._id">
      <question-item :question="question" :onQuestionDelete="onQuestionDelete" />
    </div>
  </div>
</template>

<script>
import QuestionItem from './QuestionItem';

export default {
  name: 'QuestionsList',

  props: ['questions', 'onQuestionDelete'],

  data() {
    return {
      answer: { text: '' },
    };
  },

  computed: {},

  methods: {},

  components: {
    QuestionItem,
  },
};
</script>

<style></style>
