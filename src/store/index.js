import { createStore } from 'vuex';
import axios from 'axios';
import Images from '@/Images.js';
import NProgress from 'nprogress';

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
    idCount: 4,
    delAlert: {
      plight: false,
      delId: null,
      isRep: false,
    },
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
      } else return Images.loadingAvatar;
    },
  },
  mutations: {
    SET_THREAD_DATA(state, data) {
      state.totalThreads = data;
      localStorage.setItem('threadData', JSON.stringify(data));
    },
    SET_CURRENTUSER_DATA(state, data) {
      state.currentUser = data;
      localStorage.setItem('currentUserData', JSON.stringify(data));
    },
    SET_REPMODE(state, bool) {
      state.repMode = bool;
    },
    SET_IDCOUNT(state, val) {
      state.idCount = val;
      localStorage.setItem('idCountData', JSON.stringify(val));
    },
    ADD_THREAD_DATA(state, data) {
      state.totalThreads.push(data);
      localStorage.setItem('threadData', JSON.stringify(state.totalThreads));
    },
    SET_DEL_INFO(state, { plight, id, isRep }) {
      state.delAlert.plight = plight;
      state.delAlert.delId = id;
      state.delAlert.isRep = isRep;
    },
  },
  actions: {
    fetchAll({ commit }) {
      NProgress.start();
      // checking if data is already in local storage
      if (
        localStorage.getItem('threadData') === null ||
        localStorage.getItem('currentUserData') === null ||
        localStorage.getItem('idCountData') === null
      ) {
        console.log('fetching data from JSON server');
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
          })
          .finally(() => {
            NProgress.done();
          });
      } else {
        console.log('fetching data from local storage');
        commit(
          'SET_THREAD_DATA',
          JSON.parse(localStorage.getItem('threadData'))
        );
        commit(
          'SET_CURRENTUSER_DATA',
          JSON.parse(localStorage.getItem('currentUserData'))
        );
        commit('SET_IDCOUNT', JSON.parse(localStorage.getItem('idCountData')));
        NProgress.done();
      }
    },
    toggleRepMode: ({ commit, state }) => {
      commit('SET_REPMODE', state.repMode ? false : true);
    },
    updateData({ commit, state }, { idenKey, idenVal, targetKey, newV }) {
      let obj = state.totalThreads;

      // function getObjects(obj, iden, newVal) {
      //   var newValue = newVal;
      //   var objects = [];
      //   for (var i in obj) {
      //     if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      //     if (typeof obj[i] == 'object') {
      //       objects = objects.concat(getObjects(obj[i], id, newValue));
      //     } else if (i == 'id' && obj['id'] == iden) {
      //       obj['score'] = newValue;
      //     }
      //   }
      //   return obj;
      // }
      // commit('SET_THREAD_DATA', getObjects(obj, id, newScore));
      // console.log(state.totalThreads);

      /* dynamic for all */
      function surg(obj, idenKey, idenKeyVal, targetKey, newVal) {
        var newValue = newVal;
        var objects = [];
        for (var i in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          if (typeof obj[i] == 'object') {
            objects = objects.concat(
              surg(obj[i], idenKey, idenKeyVal, targetKey, newValue)
            );
          } else if (i == idenKey && obj[idenKey] == idenKeyVal) {
            obj[targetKey] = newValue;
          }
        }
        return obj;
      }
      commit('SET_THREAD_DATA', surg(obj, idenKey, idenVal, targetKey, newV));
      // console.log(surg(obj, idenKey, idenVal, targetKey, newV));
    },
    updateId({ commit }, id) {
      commit('SET_IDCOUNT', id);
    },
    addComment({ commit, state }, commentPayload) {
      let obj = state.totalThreads;
      let objj = state.totalThreads;
      function surg(obj, idenKey, idenKeyVal, targetKey, newVal) {
        var newValue = newVal;
        var objects = [];
        for (var i in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          if (typeof obj[i] == 'object') {
            objects = objects.concat(
              surg(obj[i], idenKey, idenKeyVal, targetKey, newValue)
            );
          } else if (i == idenKey && obj[idenKey] == idenKeyVal) {
            if (typeof obj[targetKey] === 'undefined') {
              repArrSurg(objj, idenKeyVal, commentPayload.commentData);
            } else obj[targetKey].push(newValue);
          }
        }
        return obj;
      }
      // gets called if replying ot a reply
      function repArrSurg(obj, idenKeyVal, targetKeyValue) {
        var objects = [];
        for (var i in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          if (typeof obj[i] == 'object' && i != 'replies') {
            objects = objects.concat(
              repArrSurg(obj[i], idenKeyVal, targetKeyValue)
            );
          } else if (i == 'replies') {
            let index = obj['replies']
              .map((object) => object.id)
              .indexOf(idenKeyVal);
            if (index >= 0) {
              obj['replies'].push(targetKeyValue);
            }
          }
        }
        return obj;
      }
      // check if reply or new comment
      if (commentPayload.repToId) {
        // adding a reply
        commit(
          'SET_THREAD_DATA',
          surg(
            obj,
            'id',
            commentPayload.repToId,
            'replies',
            commentPayload.commentData
          )
        );
        // console.log(surg(obj, idenKey, idenVal, targetKey, newV));
      } else {
        // adding a new comment
        commit('ADD_THREAD_DATA', commentPayload.commentData);
      }
    },
    delPrompt({ commit, state }, { id, isRep }) {
      if (!state.delAlert.plight) {
        commit('SET_DEL_INFO', {
          plight: true,
          id: id,
          isRep: isRep,
        });
      } else {
        commit('SET_DEL_INFO', {
          plight: false,
          id: null,
          isRep: false,
        });
      }
    },
    delComment({ commit, state }, { isRep, id }) {
      let obj = state.totalThreads;

      function repSurg(obj, idenKey, targetKeyValue) {
        var objects = [];
        for (var i in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
          if (typeof obj[i] == 'object' && i != idenKey) {
            objects = objects.concat(repSurg(obj[i], idenKey, targetKeyValue));
          } else if (i == idenKey) {
            let index = obj[idenKey]
              .map((object) => object.id)
              .indexOf(targetKeyValue);
            if (index >= 0) {
              obj[idenKey].splice(index, 1);
            }
          }
        }
        return obj;
      }

      if (isRep) {
        let newObj = repSurg(obj, 'replies', id);
        commit('SET_THREAD_DATA', newObj);
      } else {
        let index = obj.map((object) => object.id).indexOf(id);
        obj.splice(index, 1);
        commit('SET_THREAD_DATA', obj);
      }
    },
  },
  modules: {},
});
