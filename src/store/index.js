import { createStore } from 'vuex';
import axios from 'axios';
import Images from '@/Images.js';

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/anas-cd/fake_db/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default createStore({
  state: {
    totalThreads: [],
    currentUser: {},
    repMode: false,
  },
  getters: {
    getImagePath: (state) => (user) => {
      if (state.currentUser.username) {
        switch (user) {
          case 'juliusomo':
            return Images.juliusomopic;

          case 'amyrobson':
            return Images.amyrobsonpic;

          case 'maxblagun':
            return Images.maxblagunpic;

          case 'ramsesmiron':
            return Images.ramsesmironpic;

          default:
            return 'no username matched in our database';
        }
      }
    },
  },
  mutations: {
    SET_THREAD_DATA(state, data) {
      state.totalThreads = data;
    },
    SET_CURRENTUSER_DATA(state, data) {
      state.currentUser = data;
    },
    SET_REPMODE(state, bool) {
      state.repMode = bool;
    },
  },
  actions: {
    fetchAll({ commit }) {
      // getting threads
      apiClient
        .get('/comments')
        .then((response) => {
          commit('SET_THREAD_DATA', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      // getting current user data
      apiClient
        .get('/currentUser')
        .then((response) => {
          commit('SET_CURRENTUSER_DATA', response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    toggleRepMode: ({ commit, state }) => {
      commit('SET_REPMODE', state.repMode ? false : true);
    },
  },
  modules: {},
});
