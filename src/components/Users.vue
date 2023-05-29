<template>
  <div class="all-users">
    <div class="user" v-for="user in this.users" :key="user">
      <p>Nom : {{ user.nom }}</p>
      <p>Prenom : {{ user.prenom }}</p>
      <p>Email : {{ user.email }}</p>
      <p>Identifiant : {{ user.id }}</p>
      <button type="reset" class="btn" @click="suppUser(user)">
        <font-awesome-icon icon="fa-solid fa-trash-can" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "UsersComponent",
  data() {
    return {
      users: [],
    };
  },
  async mounted() {
    const resUsers = await axios.get("/users");
    console.log(resUsers.data);
    this.users = resUsers.data;
  },
  methods: {
    async suppUser(user) {
      const userId = user.id;
      const resSupp = await axios.delete(`users/${userId}`);
      console.log(resSupp);
    },
  },
};
</script>
<style>
.user {
  border-radius: 20px;
  background-color: #eaddca;
  margin: 15px;
  padding: 15px;
  display: inline-block;
  padding-top: 40px;
}
</style>
