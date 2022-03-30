export const state = () => ({
    currentUser: null,
    error: null,
});

export const getters = {
    isLoggedIn: (state) => !!state.currentUser,
    getErrors: (state) => state.error,
};

export const actions = {
    async login({ commit }, value) {
        try {
            const { data } = await this.$axios.post("/users/signin", value);
            commit("setCurrentUser", data);
        } catch (error) {
            commit("setError", error.response.data.errors);
        }
    },
    async register({ commit }, value) {
        try {
            const { data } = await this.$axios.post("/users/signup", value);
            commit("setCurrentUser", data);
        } catch (error) {
            commit("setError", error.response.data.errors);
        }
    },
};
export const mutations = {
    setCurrentUser(state, user) {
        state.currentUser = user;
    },
    setError(state, payload) {
        state.error = payload;
    },
};