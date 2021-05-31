import axios from 'axios';

import router from './router';

axios.defaults.baseURL = process.env.VUE_APP_API_URI + '/api';
axios.defaults.withCredentials = true;

axios.interceptors.response.use(undefined, (error) => {
  if (error && error.response.config.url !== '/auth/me') {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return router.push('/login');
    }
  }
});

export default {
  // questions
  getQuestions() {
    return axios.get('/questions');
  },

  getQuestionById(questionId) {
    return axios.get(`/questions/${questionId}`);
  },

  createQuestion(question) {
    return axios.post('/questions', question);
  },

  editQuestion(question) {
    return axios.put(`/questions/${question._id}`, question);
  },

  deleteQuestion(questionId) {
    return axios.delete(`/questions/${questionId}`);
  },

  createAnswer(answer) {
    return axios.post('/answers', answer);
  },

  deleteAnswer(answerId) {
    return axios.delete(`/answers/${answerId}`);
  },

  // users
  getUsers() {
    return axios.get('/users');
  },

  // auth
  login(username, password) {
    return axios.post('/auth/login', { username, password });
  },

  signup(username, password) {
    return axios.post('/auth/signup', { username, password });
  },

  logout() {
    return axios.post('/auth/logout');
  },

  getMe() {
    return axios.get('/auth/me');
  },
};
