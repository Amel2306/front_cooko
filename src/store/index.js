import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {},
  getters: {
    user: (state) => {
      return state.user;
    },
  },
  mutations: {
    user(state, user) {
      state.user = user;
    },
  },
  actions: {
    user(context, user) {
      context.commit("user", user);
    },
    async updateUser({ commit }, updatedUser) {
      try {
        const userId = updatedUser.id;
        const response = await axios.put(`/users/${userId}`, updatedUser);
        const updatedUserData = response.data; // Supposons que le serveur renvoie les informations utilisateur mises à jour après la modification

        commit("SET_USER", updatedUserData);
      } catch (error) {
        // Gérer les erreurs de requête
        console.error(
          "Erreur lors de la mise à jour des informations utilisateur :",
          error
        );
      }
    },
  },
  modules: {},
});
