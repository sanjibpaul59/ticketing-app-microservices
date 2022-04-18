export const state = () => ({
    currentUser: null,
    error: null,
});

export const getters = {
    // isAuthenticated: (state) => state.auth.loggedIn,
    isLoggedIn: (state) => !!state.currentUser,
    getErrors: (state) => state.error,
    currentUser: (state) => state.currentUser,
};

export const actions = {
    async login({ commit }, value) {
        try {
            const { data } = await this.$axios.post("/users/signin", value);
            commit("setCurrentUser", data);
        } catch (error) {
            console.log(error);
            commit("setError", error.response.data.errors);
        }
    },
    async register({ commit }, value) {
        try {
            const { data } = await this.$axios.post("/users/signup", value);
        } catch (error) {
            commit("setError", error.response.data.errors);
        }
    },
    async logOut({ commit }) {
        try {
            await this.$axios.post("/users/signout");
            commit("logout");
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
    logout(state) {
        state.currentUser = null;
        state.error = null;
    },
};