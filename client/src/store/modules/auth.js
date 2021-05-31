import api from '../../api';

const state = {
  user: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  user: (state) => state.user,
};

const actions = {
  async signup(action, user) {
    await api.signup(user.username, user.password);
  },

  async login({ commit }, user) {
    const { data } = await api.login(user.username, user.password);
    await commit('setUser', data?.data);
  },

  async logout({ commit }) {
    await api.logout();
    commit('logout');
  },

  async getCurrentUser({ commit }) {
    const { data } = await api.getMe();
    await commit('setUser', data?.data);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  logout(state) {
    state.user = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
