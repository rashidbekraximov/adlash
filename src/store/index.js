// src/store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            user: null,
        };
    },
    mutations: {
        setUser(state, user) {
                state.user = user;
        },
        clearUser(state) {
            state.user = null;
        },
    },
    actions: {
        login({ commit }, user) {
            // Simulate login logic here and then commit the user data
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('clearUser');
        },
    },
    getters: {
        user: state => state.user,
        isAuthenticated: state => !!state.user,
    },
});

export default store;
